// import { useEffect } from "react";
import { WNDLayout } from "./components/layout/WNDLayout"
import { ThemeProvider } from "./providers/theme/ThemeProvider"

export const WNDApp = () => {
    return (
        <ThemeProvider>
            <WNDLayout />
        </ThemeProvider>

    )
}
