import { Request, Response } from 'express';
import Quotation from '../models/quotation.model';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { getTemplatePath, getTempDir } from '../config/paths';

export const processQuotation = async (req: Request, res: Response): Promise<void> => {
    try {
        const quotationData = req.body;

        // 1. Guardar en la Base de Datos
        const newQuotation = new Quotation(quotationData);
        await newQuotation.save();

        // 2. Cargar la Plantilla de Excel de forma segura en Electron
        const templatePath = getTemplatePath();
        console.log('📄 Cargando plantilla Excel desde:', templatePath);

        if (!fs.existsSync(templatePath)) {
            res.status(404).json({ 
                error: `Plantilla de cotización no encontrada en el sistema de archivos: ${templatePath}` 
            });
            return;
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(templatePath);

        // Seleccionamos la primera hoja
        const worksheet = workbook.getWorksheet('Sheet1') || workbook.worksheets[0];

        if (!worksheet) {
            throw new Error("No se encontró la hoja de trabajo en el template");
        }

        worksheet.pageSetup = {
            paperSize: 9, // A4
            orientation: 'portrait',
            fitToPage: true,
            fitToWidth: 1,
            fitToHeight: 0,
        };

        // 3. Rellenar los campos estáticos
        worksheet.getCell('G2').value = newQuotation.registration_number;
        worksheet.getCell('G3').value = newQuotation.comercial_name;
        worksheet.getCell('J3').value = newQuotation.legal_representative;
        worksheet.getCell('G4').value = newQuotation.address;
        worksheet.getCell('G5').value = newQuotation.type_of_business;
        worksheet.getCell('J5').value = newQuotation.category;
        worksheet.getCell('G6').value = newQuotation.tel_fax;
        worksheet.getCell('G7').value = newQuotation.website;

        const dateObj = newQuotation.date ? new Date(newQuotation.date) : new Date();
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();

        worksheet.getCell('B3').value = `${year}년  ${month}월   ${day}일`;
        worksheet.getCell('A8').value = `합계금액: 원정 ${newQuotation.total_price_letter || ''}              (  ₩  ${newQuotation.total_price_number || 0} 원 )`;
        worksheet.getCell('H9').value = newQuotation.duration_of_work;
        worksheet.getCell('B10').value = newQuotation.work_concept;

        worksheet.getCell('H30').value = newQuotation.price_before_taxes;
        worksheet.getCell('J30').value = newQuotation.vat_total;
        worksheet.getCell('C31').value = newQuotation.total_price_number;

        // 4. Rellenar los Items dinámicamente
        const startRow = 12;
        if (Array.isArray(newQuotation.quotation_item)) {
            newQuotation.quotation_item.forEach((item, index) => {
                const row = worksheet.getRow(startRow + index);
                row.getCell(1).value = item.description;
                row.getCell(3).value = item.product_especification;
                row.getCell(4).value = item.unit;
                row.getCell(5).value = item.amount;
                row.getCell(6).value = item.unit_price;
                row.getCell(8).value = item.supply_price;
                row.getCell(10).value = item.vat;
                row.getCell(11).value = item.observations;
                row.commit();
            });
        }

        // 5. Guardar el archivo Excel en el directorio seguro del sistema operativo
        const tempDir = getTempDir();
        const tempXlsxPath = path.join(tempDir, `${newQuotation._id}.xlsx`);

        await workbook.xlsx.writeFile(tempXlsxPath);

        res.status(201).download(tempXlsxPath, `${newQuotation._id}.xlsx`, (err) => {
            if (err) {
                console.error('Error al descargar archivo generado:', err);
            }
        });

    } catch (error) {
        console.error('Error al procesar la cotización:', error);
        res.status(500).json({ error: 'Error al procesar la cotización' });
    }
};