import { Flex, Form, Text, Checkbox  } from "../../../../components/atoms"
import { useFormList } from "../../hooks/quotationForm";
import "./styles.scss";


export const CalculateItemCheck = () => {

    const form = Form.useFormInstance();

    const { handleCheckBox, calculateSupplyPrice, calculateVatperItem } = useFormList({ form })

    return (
        <Flex gap={20} className="item-check">
            <Text strong description="Calcular automáticamente:" />
            <Checkbox check={calculateSupplyPrice} name="calculateSupplyPrice" onChange={handleCheckBox}> Precio del suministro</Checkbox >
            <Checkbox check={calculateVatperItem} name="calculateVatperItem" onChange={handleCheckBox}>IVA</Checkbox>
        </Flex >
    )
}
