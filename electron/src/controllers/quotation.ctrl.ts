import { Request, Response } from 'express';
import Quotation from '../models/quotation.model';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { getTemplatePath, getTempDir } from '../config/paths';

/**
 * Genera el Workbook de ExcelJS completando todos los campos según el template de cotización.
 */
export const generateQuotationWorkbook = async (quotationData: any, templatePath: string): Promise<ExcelJS.Workbook> => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet('Sheet1') || workbook.worksheets[0];
    if (!worksheet) {
        throw new Error('No se encontró la hoja de trabajo en la plantilla de Excel');
    }

    worksheet.pageSetup = {
        paperSize: 9, // A4
        orientation: 'portrait',
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
    };

    // 1. Datos del Proveedor (Supplier)
    worksheet.getCell('G2').value = quotationData.registration_number || '';
    worksheet.getCell('G3').value = quotationData.comercial_name || '';
    worksheet.getCell('J3').value = quotationData.legal_representative || '';
    worksheet.getCell('G4').value = quotationData.address || '';
    worksheet.getCell('G5').value = quotationData.type_of_business || '';
    worksheet.getCell('J5').value = quotationData.category || '';
    worksheet.getCell('G6').value = quotationData.tel_fax || '';
    worksheet.getCell('G7').value = quotationData.website || '';

    // 2. Datos generales de la cotización
    const dateObj = quotationData.date ? new Date(quotationData.date) : new Date();
    const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
    const year = validDate.getFullYear();
    const month = validDate.getMonth() + 1;
    const day = validDate.getDate();

    worksheet.getCell('A3').value = `${year}년  ${month}월   ${day}일`;
    worksheet.getCell('A4').value = quotationData.customer ? `${quotationData.customer}  귀하` : '  귀하';

    const formattedTotalNumber = Number(quotationData.total_price_number || 0).toLocaleString();
    worksheet.getCell('A8').value = `합계금액: 원정 ${quotationData.total_price_letter || ''}              (  ₩ ${formattedTotalNumber} 원 )`;
    worksheet.getCell('H9').value = quotationData.duration_of_work || '';
    worksheet.getCell('B10').value = quotationData.work_concept || '';

    // 3. Items de la cotización (filas 12 a 29)
    const startRow = 12;
    const maxItems = 18;
    if (Array.isArray(quotationData.quotation_item)) {
        quotationData.quotation_item.slice(0, maxItems).forEach((item: any, index: number) => {
            const row = worksheet.getRow(startRow + index);
            row.getCell(1).value = item.description || '';
            row.getCell(3).value = item.product_especification || '';
            row.getCell(4).value = item.unit || '';
            row.getCell(5).value = Number(item.amount) || 0;
            row.getCell(6).value = Number(item.unit_price) || 0;
            row.getCell(8).value = Number(item.supply_price) || 0;
            row.getCell(10).value = Number(item.vat) || 0;
            row.getCell(11).value = item.observations || '';
            row.commit();
        });
    }

    // 4. Totales económicos
    worksheet.getCell('H30').value = Number(quotationData.price_before_taxes) || 0;
    worksheet.getCell('J30').value = Number(quotationData.vat_total) || 0;
    worksheet.getCell('C31').value = Number(quotationData.total_price_number) || 0;

    return workbook;
};

/**
 * Procesa la cotización:
 * 1. Resuelve la plantilla correspondiente al registration_number del proveedor.
 * 2. Genera y escribe el archivo Excel en disco temporal.
 * 3. Una vez generado el archivo correctamente, persiste los datos en MongoDB.
 * 4. Retorna la respuesta con el documento guardado y la ruta del archivo generado.
 */
export const processQuotation = async (req: Request, res: Response): Promise<void> => {
    let tempFilePath = '';
    try {
        const quotationData = req.body;

        if (!quotationData || !quotationData.registration_number) {
            res.status(400).json({ 
                error: 'El número de registro del proveedor (registration_number) es requerido' 
            });
            return;
        }

        // 1. Obtener la plantilla según el registration_number del proveedor elegido
        const templatePath = getTemplatePath(quotationData.registration_number);
        console.log(`📄 Plantilla resuelta para proveedor (${quotationData.registration_number}):`, templatePath);

        if (!fs.existsSync(templatePath)) {
            res.status(404).json({ 
                error: `No se encontró la plantilla de cotización para el proveedor con registro "${quotationData.registration_number}". Ruta verificada: ${templatePath}` 
            });
            return;
        }

        // 2. Generar el archivo de Excel y guardarlo en el directorio temporal
        const workbook = await generateQuotationWorkbook(quotationData, templatePath);
        const tempDir = getTempDir();
        const tempFileName = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.xlsx`;
        tempFilePath = path.join(tempDir, tempFileName);

        await workbook.xlsx.writeFile(tempFilePath);
        console.log(`✅ Archivo Excel generado correctamente en: ${tempFilePath}`);

        // 3. UNA VEZ GENERADO EL ARCHIVO DE EXCEL -> Guardar en MongoDB
        const newQuotation = new Quotation(quotationData);
        const savedQuotation = await newQuotation.save();
        console.log(`💾 Cotización guardada en MongoDB con ID: ${savedQuotation._id}`);

        // 4. Renombrar el archivo temporal con el ID asignado por MongoDB
        const finalFilePath = path.join(tempDir, `${savedQuotation._id}.xlsx`);
        try {
            if (fs.existsSync(tempFilePath)) {
                fs.renameSync(tempFilePath, finalFilePath);
            }
        } catch (renameErr) {
            console.warn('Advertencia al renombrar archivo temporal:', renameErr);
        }

        // 5. Retornar respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Cotización procesada, Excel generado y guardado en base de datos exitosamente',
            quotation: savedQuotation,
            filePath: fs.existsSync(finalFilePath) ? finalFilePath : tempFilePath,
            fileName: `${savedQuotation._id}.xlsx`,
            downloadUrl: `/api/quotations/${savedQuotation._id}/download`
        });

    } catch (error) {
        console.error('❌ Error al procesar la cotización:', error);
        // Si falló y el archivo temporal quedó creado, limpiarlo
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try { fs.unlinkSync(tempFilePath); } catch {}
        }
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Error interno al procesar la cotización' 
        });
    }
};

/**
 * Obtiene todas las cotizaciones ordenadas por fecha de creación descendente.
 */
export const getAllQuotations = async (_req: Request, res: Response): Promise<void> => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: quotations.length,
            quotations,
        });
    } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
        res.status(500).json({ error: 'Error al obtener la lista de cotizaciones' });
    }
};

/**
 * Obtiene una cotización por su ID.
 */
export const getQuotationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) {
            res.status(404).json({ error: 'Cotización no encontrada' });
            return;
        }
        res.json({ success: true, quotation });
    } catch (error) {
        console.error('Error al obtener cotización:', error);
        res.status(500).json({ error: 'Error al obtener la cotización' });
    }
};

/**
 * Descarga el archivo Excel de una cotización por su ID.
 * Si el archivo no existe en el directorio temporal, lo regenera desde la BD y la plantilla.
 */
export const downloadQuotationExcel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const quotation = await Quotation.findById(id);
        if (!quotation) {
            res.status(404).json({ error: 'Cotización no encontrada en la base de datos' });
            return;
        }

        const tempDir = getTempDir();
        const expectedFilePath = path.join(tempDir, `${quotation._id}.xlsx`);

        // Si ya existe en disco temporal, enviarlo
        if (fs.existsSync(expectedFilePath)) {
            res.download(expectedFilePath, `Cotizacion_${quotation.customer || id}.xlsx`);
            return;
        }

        // Si no existe, regenerarlo desde la BD
        const templatePath = getTemplatePath(quotation.registration_number);
        if (!fs.existsSync(templatePath)) {
            res.status(404).json({ 
                error: `Plantilla no encontrada para el proveedor ${quotation.registration_number}` 
            });
            return;
        }

        const workbook = await generateQuotationWorkbook(quotation.toObject(), templatePath);
        await workbook.xlsx.writeFile(expectedFilePath);

        res.download(expectedFilePath, `Cotizacion_${quotation.customer || id}.xlsx`);
    } catch (error) {
        console.error('Error al descargar Excel de cotización:', error);
        res.status(500).json({ error: 'Error al generar o descargar el archivo Excel' });
    }
};

/**
 * Elimina una cotización por su ID.
 */
export const deleteQuotation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Quotation.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ error: 'Cotización no encontrada' });
            return;
        }

        const tempDir = getTempDir();
        const filePath = path.join(tempDir, `${id}.xlsx`);
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch {}
        }

        res.json({ success: true, message: 'Cotización eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar cotización:', error);
        res.status(500).json({ error: 'Error al eliminar la cotización' });
    }
};