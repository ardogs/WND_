import { createBrowserRouter } from "react-router-dom";
import { WNDApp } from "../WNDApp";
import { Home } from "../features/home/Home";
import { Invoices } from "../features/invoices/Invoices";
import { Quotations } from "../features/quotations/Quotations";
import { Settings } from "../features/settings/Settings";
import { Companies } from "../features/companies/Companies";
import { Home as QuotationHome } from "../features/quotations/pages/main/Home";
import { Home as CompaniesHome } from "../features/companies/pages/main/Home";
import { NewQuotation } from "../features/quotations/pages"
import { useCompaniesStore } from "../store/companies/useCompaniesStore";
import { useSettingsStore } from "../store/settings/useSettingStore";
import { Error, LoadingScreen } from "../components/organisms";
import { CompaniesForm } from "../features/companies/pages/companiesForm/CompaniesForm";
import { useAuthStore } from "../store/settings/useAuthStore";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: WNDApp,
        loader: async () => {
            const appLoaded = useSettingsStore.getState().appLoaded
            if (appLoaded)
                return;

            const dataPromise = useSettingsStore.getState().getSystemInfo();

            const tokenAPIFromLocalStorage = useAuthStore.getState().token;
            const fetchSettingsPromise = useSettingsStore.getState().fetchAppSettings( tokenAPIFromLocalStorage  );
            // const apiConnectionStatus =  useSettingsStore.getState().setStatusConnection();
            const companiesDataPromise = useCompaniesStore.getState().fetchCompanies(tokenAPIFromLocalStorage);
            const timerPromise = new Promise(resolve => setTimeout(resolve, 2000));

            await Promise.all([dataPromise, companiesDataPromise, fetchSettingsPromise, timerPromise]);
            // await Promise.all([apiConnectionStatus])
            return null;
        },
        hydrateFallbackElement: <LoadingScreen />,

        children: [
            {
                ErrorBoundary: Error,

                children: [
                    {
                        index: true,
                        Component: Home,
                    },
                    {
                        path: 'quotations',
                        Component: Quotations,
                        children: [
                            {
                                path: "",
                                Component: QuotationHome,
                            },
                            {
                                path: "new",
                                Component: NewQuotation,
                            }
                        ]
                    },
                    {
                        path: 'invoices',
                        Component: Invoices,
                    },
                    {
                        path: 'companies',
                        Component: Companies,
                        children: [
                            {
                                path: "",
                                Component: CompaniesHome
                            },

                            {
                                path: "companiesForm/:mode/:registration_number",
                                Component: CompaniesForm
                            }
                        ]
                    },
                    {
                        path: 'settings',
                        Component: Settings,
                    },
                    {
                        path: "*",
                        Component: Error
                    }
                ]
            }
        ],

    },


],
    // fallbackElement: <AppLoadingFallback />,
);