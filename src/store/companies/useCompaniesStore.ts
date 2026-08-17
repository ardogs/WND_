import { create } from "zustand";
import { Company } from "../../features/companies/types";
import { fetchSupplierListAPI, updateSupplier } from "../../api/companies";
import { useSettingsStore } from "../settings/useSettingStore";
import { useAuthStore } from "../settings/useAuthStore";

interface CompanyActions {
    isLoading: boolean
    error: string
    registration_number_id: string

    fetchCompanies: (token: string) => void
    setCurrentCompany: (data: string) => void
    updateSupplier: (data: Company) => Promise<boolean>
}

interface Companies {
    companyData: Company[];
}

export const useCompaniesStore = create<Companies & CompanyActions>((set, get) => ({
    registration_number_id: "SUP-001",
    companyData: [],
    isLoading: false,
    error: "",

    fetchCompanies: async (token: string) => {
        set({ isLoading: true, error: "" })
        try {
            const response = await fetchSupplierListAPI(token);
            if (Array.isArray(response)) {
                const currentId = get().registration_number_id;
                const exists = response.some(c => c.registration_number === currentId);
                const defaultId = exists ? currentId : (response[0]?.registration_number || "SUP-001");
                set({ companyData: response, registration_number_id: defaultId, isLoading: false });
            } else {
                const errorMessage = response?.message || "Failed to fetch companies";
                set({ error: errorMessage, isLoading: false });
            }
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    },

    setCurrentCompany: (company_id: string) => {
        set({ registration_number_id: company_id })
    },

    updateSupplier: async (data: Company) => {
        const token = useAuthStore.getState().token
        set({ isLoading: true, error: "" })
        try {
            await updateSupplier(useSettingsStore.getState().apiToken, data)
            get().fetchCompanies(token)
            set({ isLoading: false })
            return true
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
            return false
        }
    }
}))