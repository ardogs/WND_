export interface QuotationFormType {

    registration_number: string,
    comercial_name: string,
    legal_representative: string,
    address: string,
    type_of_business: string,
    category: string,
    tel_fax: string,
    website: string,

    date: Date | string,
    customer: string,
    work_concept: string,
    duration_of_work: string,

    quotation_item: QuotationItem[],

    price_before_taxes: number,
    vat_total: number,
    total_price_letter: string,
    total_price_number: number
}

export interface QuotationItem {
    description: string,
    product_especification: string,
    unit: string,
    amount: number,
    unit_price: number,
    supply_price: number,
    vat: number,
    observations: string,
}

export const initialValues: QuotationFormType = {
    registration_number: "",
    comercial_name: "",
    legal_representative: "",
    address: "",
    type_of_business: "",
    category: "",
    tel_fax: "",
    website: "",

    date: "",
    customer: "",
    work_concept: "",
    duration_of_work: "",
    quotation_item: [
        {
            description: "",
            product_especification: "",
            unit: "",
            amount: 0,
            unit_price: 0,
            supply_price: 0,
            vat: 0,
            observations: "",
        }
    ],
    price_before_taxes: 0,
    vat_total: 0,
    total_price_letter: "",
    total_price_number: 0

}