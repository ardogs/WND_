import Supplier from '../models/supplier.model';

const defaultSuppliers = [
    {
        registration_number: "SUP-001",
        comercial_name: "Tech Global Solutions",
        legal_representative: "Kim Ji-won",
        address: "Seoul, South Korea",
        type_of_business: "Tecnología",
        category: "Hardware",
        tel_fax: "+82 2-1234-5678",
        website: "https://techglobal.kr",
        img: "https://via.placeholder.com/150"
    },
    {
        registration_number: "SUP-002",
        comercial_name: "Industrial IoT Pro",
        legal_representative: "Park Seo-jun",
        address: "Busan, South Korea",
        type_of_business: "Manufactura",
        category: "Sensores",
        tel_fax: "+82 51-987-6543",
        website: "https://iotpro.kr",
        img: "https://via.placeholder.com/150"
    }
];

export const seedSuppliers = async () => {
    try {
        // 1. Contamos cuántos proveedores existen
        const count = await Supplier.countDocuments();

        if (count === 0) {
            console.log('🌱 No se encontraron proveedores. Creando datos por defecto...');
            // 2. Insertamos los datos iniciales
            await Supplier.insertMany(defaultSuppliers);
            console.log('✅ Proveedores iniciales creados exitosamente.');
        } else {
            console.log(`ℹ️ La base de datos ya contiene ${count} proveedores. Saltando seeding.`);
        }
    } catch (error) {
        console.error('❌ Error al ejecutar el seeding de proveedores:', error);
    }
};