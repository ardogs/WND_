import { create } from "zustand";
import { Company } from "../../features/companies/types";
// import img_0 from "../../assets/img/Doc_0.webp"
// import img_1 from "../../assets/img/Doc_1.webp"
// import img_2 from "../../assets/img/Doc_2.webp"
import { fetchSupplierListAPI, updateSupplier } from "../../api/companies";
import { useSettingsStore } from "../settings/useSettingStore";
// import { Companies } from '../../features/companies/Companies';

interface CompanyActions {
    isLoading: boolean
    error: string
    fetchCompanies: (token: string) => void
    setCompanyData: (data: Company) => void;
    updateSupplier: (data: Company) => void
}

interface Companies {
    companyData: Company[];
}


// const suppliersData: Company[] = [
//     {
//         registration_number: '503-18-35279',
//         comercial_name: 'Proveedor 1',
//         legal_representative: 'Representante 1',
//         address: 'Calle Falsa 123',
//         type_of_business: 'Construcción',
//         category: 'Categoria A',
//         tel_fax: '123456789',
//         website: 'https://www.proveedor1.com',
//         img: img_0
//     },
//     {
//         registration_number: '514-20-20987',
//         comercial_name: 'Proveedor 2',
//         legal_representative: 'Representante 2',
//         address: 'Calle Verdadera 456',
//         type_of_business: 'Servicios',
//         category: 'Categoria B',
//         tel_fax: '987654321',
//         website: 'https://www.proveedor2.com',
//         img: img_1
//     },
//     {
//         registration_number: '798-68-00335',
//         comercial_name: 'Proveedor 3',
//         legal_representative: 'Representante 3',
//         address: 'Avenida Siempre Viva 789',
//         type_of_business: 'Tecnología',
//         category: 'Categoria C',
//         tel_fax: '456123789',
//         website: 'https://www.proveedor3.com',
//         img: img_2
//     }
// ];

// const simulateAPI = (): Promise<Company[]> => {
//     // console.log(`Buscando usuario con ID: ${userId}...`);
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             // if (userId === 1) {
//             resolve(suppliersData);
//             // } else {
//             // reject({status: 400});
//             // }
//         }, 10); // Simulamos un retardo de 1.5 segundos
//     });
// };


export const useCompaniesStore = create<Company & CompanyActions & Companies>((set) => ({
    registration_number: "",
    comercial_name: "",
    legal_representative: "",
    address: "",
    type_of_business: "",
    category: "",
    tel_fax: "",
    website: "",
    img: "",
    companyData: [],

    isLoading: false,
    error: "",

    fetchCompanies: async (token: string) => {
        set({ isLoading: true, error: "" })
        try {
            const data: Company[] = (await fetchSupplierListAPI(token)) || [];
            set({ companyData: data})
            console.log(data)
            
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    },

    setCompanyData: (company) => {
        set({
            registration_number: company.registration_number,
            comercial_name: company.comercial_name,
            legal_representative: company.legal_representative,
            address: company.address,
            type_of_business: company.type_of_business,
            category: company.category,
            tel_fax: company.tel_fax,
            website: company.website,
            img: company.img,
        })
    },
    updateSupplier: ( data: Company) => {
        set({isLoading: false, error: ""})
        try {
            set({ isLoading: true })
            const resp = updateSupplier(useSettingsStore.getState().apiToken, data)
            console.log(resp)
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    }
})) 