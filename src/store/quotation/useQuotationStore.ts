import { create } from "zustand";
import { QuotationFormType } from "../../features/quotations/components/quoteForm/QuoteForm.data";
import { useAuthStore } from "../settings/useAuthStore";
import {
    saveQuotation,
    getAllQuotations,
    deleteQuotationApi,
    ProcessQuotationResponse
} from "../../api/quotations";
import { toast } from "sonner";

type mode = 'read' | 'edit' | 'create';

export interface SavedQuotation extends QuotationFormType {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}

interface QuotationState {
    mode: mode;
    calculateVatperItem: boolean;
    calculateSupplyPrice: boolean;
    calculatePriceBeforeTaxes: boolean;
    calculateTotalVat: boolean;
    calculateTotalPrice: boolean;
    isLoading: boolean;
    error: string;
    lastGeneratedQuotation: SavedQuotation | null;
    lastGeneratedFilePath: string;
    lastGeneratedFileName: string;
    lastGeneratedDownloadUrl: string;
    quotationsList: SavedQuotation[];
    isLoadingList: boolean;
    errorList: string;
}

interface QuotationActions {
    setAutomaticCalculation: (key: CheckItemKey, value: boolean) => void;
    sendQuotationData: (data: QuotationFormType) => Promise<boolean>;
    fetchQuotationsList: () => Promise<void>;
    deleteQuotation: (id: string) => Promise<boolean>;
    resetQuotationCreation: () => void;
}

const initialValues: QuotationState = {
    mode: "create",
    calculateVatperItem: true,
    calculatePriceBeforeTaxes: true,
    calculateSupplyPrice: true,
    calculateTotalVat: true,
    calculateTotalPrice: true,
    isLoading: false,
    error: "",
    lastGeneratedQuotation: null,
    lastGeneratedFilePath: "",
    lastGeneratedFileName: "",
    lastGeneratedDownloadUrl: "",
    quotationsList: [],
    isLoadingList: false,
    errorList: "",
};

export type CheckItemKey = keyof typeof initialValues;

export const useQuotationStore = create<QuotationState & QuotationActions>((set) => ({
    ...initialValues,

    setAutomaticCalculation: (key, value) => {
        set(state => ({
            ...state,
            [key]: value,
        }));
    },

    sendQuotationData: async (data: QuotationFormType): Promise<boolean> => {
        const token = useAuthStore.getState().token;
        set({ isLoading: true, error: "" });

        try {
            const result = await saveQuotation(token, data);

            if (typeof result === 'object' && 'statusCode' in result) {
                const errorMsg = result.message || 'Error al procesar la cotización';
                set({ error: errorMsg, isLoading: false });
                toast.error(`Error al crear cotización: ${errorMsg}`);
                return false;
            }

            const successRes = result as ProcessQuotationResponse;
            if (successRes && successRes.success) {
                set({
                    isLoading: false,
                    error: "",
                    lastGeneratedQuotation: successRes.quotation,
                    lastGeneratedFilePath: successRes.filePath || "",
                    lastGeneratedFileName: successRes.fileName || "",
                    lastGeneratedDownloadUrl: successRes.downloadUrl || "",
                });
                toast.success('¡Cotización generada y guardada correctamente!');
                return true;
            } else {
                const msg = 'La respuesta del servidor no fue exitosa';
                set({ error: msg, isLoading: false });
                toast.error(msg);
                return false;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, isLoading: false });
            toast.error(`Error inesperado: ${errorMessage}`);
            return false;
        }
    },

    fetchQuotationsList: async () => {
        const token = useAuthStore.getState().token;
        set({ isLoadingList: true, errorList: "" });
        try {
            const result = await getAllQuotations(token);
            if (typeof result === 'object' && 'quotations' in result) {
                set({ quotationsList: result.quotations, isLoadingList: false, errorList: "" });
            } else if (typeof result === 'object' && 'statusCode' in result) {
                const errorMsg = result.message || 'No se pudo cargar la lista de cotizaciones';
                set({ isLoadingList: false, errorList: errorMsg });
                toast.error(`Error al cargar cotizaciones: ${errorMsg}`);
            } else {
                set({ isLoadingList: false });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error('Error al cargar lista de cotizaciones:', error);
            set({ isLoadingList: false, errorList: errorMessage });
            toast.error(`Error de conexión: ${errorMessage}`);
        }
    },

    deleteQuotation: async (id: string): Promise<boolean> => {
        const token = useAuthStore.getState().token;
        try {
            const result = await deleteQuotationApi(token, id);
            if (typeof result === 'object' && 'success' in result && result.success) {
                set(state => ({
                    quotationsList: state.quotationsList.filter(q => q._id !== id),
                }));
                toast.success('Cotización eliminada correctamente');
                return true;
            } else if (typeof result === 'object' && 'message' in result) {
                toast.error(`Error al eliminar: ${result.message}`);
            }
            return false;
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            console.error('Error al eliminar cotización:', error);
            toast.error(`Error al eliminar cotización: ${msg}`);
            return false;
        }
    },

    resetQuotationCreation: () => {
        set({
            isLoading: false,
            error: "",
            lastGeneratedQuotation: null,
            lastGeneratedFilePath: "",
            lastGeneratedFileName: "",
            lastGeneratedDownloadUrl: "",
        });
    },
}));
 