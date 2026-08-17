import { Flex, Form, Text, Checkbox } from "../../../../components/atoms"
import { useFormList } from "../../hooks/quotationForm"
import { QuotationFormType } from "../quoteForm/QuoteForm.data"

export const CalculateTotalCheck = () => {
    const form = Form.useFormInstance<QuotationFormType>()
    const { handleCheckBox, calculatePriceBeforeTaxes, calculateTotalVat, calculateTotalPrice } = useFormList({ form })

    return (
        <Flex gap={20} align="center" className="flex-wrap items-center">
            <Text strong description="Calcular automáticamente:" />
            <Checkbox check={calculatePriceBeforeTaxes} name="calculatePriceBeforeTaxes" onChange={handleCheckBox}>Precio antes de impuestos</Checkbox>
            <Checkbox check={calculateTotalVat} name="calculateTotalVat" onChange={handleCheckBox}>IVA total</Checkbox>
            <Checkbox check={calculateTotalPrice} name="calculateTotalPrice" onChange={handleCheckBox}>Precio total</Checkbox>
        </Flex>
    )
}
