import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier {
    registration_number: string,
    comercial_name: string,
    legal_representative: string
    address: string
    type_of_business: string
    category: string
    tel_fax: string
    website: string,
    img: string,
    quotation_fields_config?: Record<string, boolean>,
    quotation_excel_mapping?: Record<string, string>
}

const SupplierSchema: Schema = new Schema({
    // Usamos default para asegurar que siempre haya un valor inicial
    registration_number: { type: String, required: true, default: "" },
    comercial_name: { type: String, default: "" },
    legal_representative: { type: String, default: "" },
    address: { type: String, default: "" },
    type_of_business: { type: String, default: "" },
    category: { type: String, default: "" },
    tel_fax: { type: String, default: "" },
    website: { type: String, default: "" },
    img: { type: String, default: "" },
    quotation_fields_config: { type: Schema.Types.Mixed, default: {} },
    quotation_excel_mapping: { type: Schema.Types.Mixed, default: {} },
}, {
    timestamps: true,
});

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);