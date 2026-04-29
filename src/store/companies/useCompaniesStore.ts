import { create } from "zustand";
import { Company } from "../../features/companies/types";
import { fetchSupplierListAPI, updateSupplier } from "../../api/companies";
import { useSettingsStore } from "../settings/useSettingStore";

interface CompanyActions {
    isLoading: boolean
    error: string
    registration_number_id: string

    fetchCompanies: (token: string) => void
    setCurrentCompany: (data: string) => void
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


export const useCompaniesStore = create< Companies & CompanyActions>((set) => ({
    registration_number_id: "SUP-001",
    companyData: [],
    isLoading: false,
    error: "",

    fetchCompanies: async (token: string) => {
        set({ isLoading: true, error: "" })
        try {
            const data: Company[] = (await fetchSupplierListAPI(token)) || [];
            set({ companyData: data})
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    },

    setCurrentCompany: (company_id: string) => {
        set({ registration_number_id: company_id })
    },
    
    updateSupplier: async ( data: Company) => {
        set({isLoading: false, error: ""})
        try {
            set({ isLoading: true })
            await updateSupplier(useSettingsStore.getState().apiToken, data)
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    }
})) 