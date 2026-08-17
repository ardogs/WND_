import mongoose, { Schema, Document } from 'mongoose';
import { QuotationFormType } from '../types/QuotationTypes'; // O de donde importes tus tipos

export interface IQuotation extends Omit<QuotationFormType, 'date'>, Document {
    date: Date;
}

// Esquema para los items individuales
const QuotationItemSchema: Schema = new Schema({
    description: { type: String },
    product_especification: { type: String },
    unit: { type: String },
    amount: { type: Number, default: 0 },
    unit_price: { type: Number, default: 0 },
    supply_price: { type: Number, default: 0 },
    vat: { type: Number, default: 0 },
    observations: { type: String }
});

// Esquema principal de la cotización/factura
const QuotationSchema: Schema = new Schema({
    // Datos del Proveedor
    registration_number: { type: String, required: true },
    comercial_name: { type: String, required: true },
    legal_representative: { type: String },
    address: { type: String },
    type_of_business: { type: String },
    category: { type: String },
    tel_fax: { type: String },
    website: { type: String },

    // Datos de la Cotización
    date: { type: Date, required: true },
    customer: { type: String, required: true },
    work_concept: { type: String },
    duration_of_work: { type: String },

    // Arreglo de Items
    quotation_item: [QuotationItemSchema],

    // Totales
    price_before_taxes: { type: Number, default: 0 },
    vat_total: { type: Number, default: 0 },
    total_price_letter: { type: String },
    total_price_number: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IQuotation>('Quotation', QuotationSchema);