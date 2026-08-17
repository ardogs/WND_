export interface Company {
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

export type companyDataSelectorType = 'dependent' | 'independent';
export type companyDataSelectorMode = 'edit' | 'view' | 'default';