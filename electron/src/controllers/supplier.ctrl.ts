import { Request, Response } from 'express';
import Supplier from '../models/supplier.model';

// Crear o Actualizar (Upsert) por registration_number
export const saveSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const registration_number = req.body.registration_number || req.query.reg || req.params.reg;
        if (!registration_number) {
            res.status(400).json({ error: 'El número de registro es obligatorio' });
            return;
        }

        const updateData = { ...req.body, registration_number };
        const supplier = await Supplier.findOneAndUpdate(
            { registration_number },
            { $set: updateData },
            { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
        );
        console.log(`✅ Proveedor guardado con éxito en DB (${registration_number}):`, {
            comercial_name: supplier?.comercial_name,
            quotation_fields_count: Object.keys(supplier?.quotation_fields_config || {}).length,
            quotation_excel_mapping_count: Object.keys(supplier?.quotation_excel_mapping || {}).length,
        });
        res.status(200).json(supplier);
    } catch (error) {
        console.error('❌ Error al procesar el proveedor en DB:', error);
        res.status(500).json({ error: 'Error al procesar el proveedor' });
    }
};

// Obtener todos
export const getAllSuppliers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener proveedores' });
    }
};

// Obtener uno solo por su registro
export const getSupplierByReg = async (req: Request, res: Response): Promise<void> => {
    try {
        const reg = req.params.reg as string;
        const supplier = await Supplier.findOne({ registration_number: reg });
        if (!supplier) {
            res.status(404).json({ message: 'Proveedor no encontrado' });
            return;
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
};