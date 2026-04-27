import { ThemeConfig } from "antd";

const dark = {
    "color_1": "#1E1E1E",
    "color_2": "#252525",
    "color_3": "#2E2E2E",
    "color_primary": "#0176D3",
    "color_text_base": "#D9D9D9",
    "color_text_title": "#ced4da"
};


const light = {
    "color_1": '#F9F9F9',
    "color_2": '#EAEAEA',
    "color_3": "#FCFCFC",
    "color_primary": "#0176D3",
    // "color_text_base": '#8C8C8C',
      "color_text_base": '#464747ff',
    "color_text_title": "#404040"
};


export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: light.color_primary,
        colorBgBase: light.color_2,
        colorBgContainer: light.color_3,
        colorTextBase: light.color_text_base,
        // colorTextHeading: light.color_text_title,
        colorBgElevated: light.color_1,
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        // boxShadowSecondary: '0 2px 4px rgba(0, 0, 0, 0.06)',
        // boxShadowTertiary: '0 8px 16px rgba(0, 0, 0, 0.12)',
        fontSize: 15,
        
    },

    components: {
        Layout: {
            headerBg: light.color_1,
            headerHeight: "45px",
            headerPadding: "0px",
            bodyBg: light.color_2,
            footerBg: light.color_3,
            footerPadding: 8
        },

        Typography: {
            titleMarginTop: '0px',
            // titleMarginBottom: '0px'
        },
        Menu: {
            colorBgContainer: light.color_1,
            horizontalItemBorderRadius: 10
            // colorItemText: '#ffffff',
        },
        Tabs: {
            verticalItemMargin: '10px 40px 5px 0px',
            verticalItemPadding: '5px 0px',
            itemSelectedColor: light.color_primary,
            itemHoverColor: light.color_primary,
            itemColor: light.color_text_base
        },
        // List: {
        //     titleMarginBottom: 50
        // }


    },

    // algorithm: 'default',
};
// 363636
export const darkTheme = {
    token: {
        colorPrimary: dark.color_primary,
        colorBgBase: dark.color_2,
        colorBgContainer: dark.color_3,
        colorTextBase: dark.color_text_base,
        // colorTextHeading: dark.color_text_title,
        colorBgElevated: dark.color_1,
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        // boxShadowSecondary: '0 2px 4px rgba(0, 0, 0, 0.4)',
        // boxShadowTertiary: '0 8px 16px rgba(0, 0, 0, 0.6)',
        fontSize: 15
    },

    components: {
        Layout: {
            headerBg: dark.color_1,
            headerHeight: "45px",
            headerPadding: "0px",
            bodyBg: dark.color_2,
            footerBg: dark.color_3,
            footerPadding: 8

        },
        Typography: {
            titleMarginTop: '0px',
            // titleMarginBottom: '0px'
        },

        Menu: {
            colorBgContainer: dark.color_1,
            horizontalItemBorderRadius: 10
            // colorItemText: '#ffffff',
        },
        Tabs: {
            verticalItemMargin: '10px 40px 5px 0px',
            verticalItemPadding: '5px 0px',
            itemSelectedColor: dark.color_primary,
            itemHoverColor: dark.color_primary,
            itemColor: dark.color_text_base,
            inkBarColor: dark.color_text_base
        },
        List: {
            // titleMarginBottom: 50,
            // itemPadding: 1,
            // metaMarginBottom: 0	
        }
    },
    // algorithm: 'dark',


};