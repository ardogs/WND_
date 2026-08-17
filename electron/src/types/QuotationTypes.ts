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