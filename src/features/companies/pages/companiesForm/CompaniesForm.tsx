
import { useParams } from "react-router-dom"
import { CompanyDataSelectorType, companyDataSelectorMode } from '../../../../components/organisms/companyDataSelector/types';
import { Flex, Form, Button } from "../../../../components/atoms";
import { CompanyDataSelector } from "../../../../components/organisms"
import { useCompanies, useCompanyDataForm, useTitleBar } from "../../../../hooks";
import { TitleWithDescription } from "../../../../components/molecules";
import { AnimatedPage } from "../../../../components/layout";
import { useCompaniesForm } from "../../hooks/useCompaniesForm";
import { Company } from '../../types';



export const CompaniesForm = () => {

    const { mode, registration_number } = useParams();
    const { handleGoBack } = useTitleBar();
    const {updateSupplier} =  useCompanies()
    const [form] = Form.useForm<CompanyDataSelectorType | Company>();
    useCompaniesForm(registration_number!);
    useCompanyDataForm({ companyDataSelectorForm: form })

    const handleOnFinish = () => {
        updateSupplier(form.getFieldsValue(true) as Company)
        // console.log("heeehee", form.getFieldsValue(true) as Company)
    }

    return (
        <AnimatedPage>
            <div>
                <Flex align="end" justify="space-between">
                    {
                        (mode === 'edit')
                            ? <TitleWithDescription title="Editar empresa" description="Edita la información de la empresa seleccionada" />
                            : <TitleWithDescription title="Información de tu empresa" description="Muestra información detallada de la empresa seleccionada" />
                    }
                </Flex>

                <Form form={form} style={{ marginTop: "50px", marginBottom: "60px" }} onFinish={handleOnFinish}>
                    <CompanyDataSelector mode={mode as companyDataSelectorMode}  defaultValue={registration_number} />
                    <Flex justify="center" align="center" gap={10} style={{ marginTop: '40px' }}>
                        <Button type="default" text="Volver" onClick={handleGoBack} />
                        {(mode === 'edit') && <Button type="primary" htmlType='submit' text="Actualizar" />}
                    </Flex>
                </Form>
            </div>
        </AnimatedPage>


    )
}
