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
    img: string
}

const SupplierSchema: Schema = new Schema({
    // Usamos default para asegurar que siempre haya un valor inicial
    registration_number: { type: String, default: "" },
    comercial_name: { type: String, default: "" },
    legal_representative: { type: String, default: '' },
    address: { type: String, required: "" },
    type_of_business: { type: String, required: "" },
    category: {type: String, required: true, default: ""},
    tel_fax: {type: String, required: true, default: ""},
    website: {type: String, required: true, default: ""},
    img: {type: String, default: ""},
}, {
    timestamps: true,
    // Forzamos a que solo exista un documento en esta colección para configuraciones globales
    // collection: 'settings' 
});

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);