import { Form } from "../../../../../components/atoms"
import { Input } from '../../../../../components/atoms/input/Input';
import { Button } from "../../../../../components/atoms";
import { useSettings } from "../../../../../hooks";



interface FormType {
    apiPWD: string
}


export const APIAccessForm = () => {
    const [form] = Form.useForm<FormType>();
    const { apiPWD, apiPWDisLoading, handleApiPwd } = useSettings();

    // const initialValues: FormType = {
    //     apiPWD: "SuperSecretPassword123!"
    // }

    

    return (
        <Form onFinish={(value) => handleApiPwd(value.apiPWD)} layout="inline" className="api-input-form" disabled={apiPWDisLoading} form={form} >
            <Form.Item name='apiPWD' rules={[{ required: true, message: 'This field is requiered' }]}>
                <Input placeholder="Contraseña" value={apiPWD} type="password"/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" text="Conectar" loading={apiPWDisLoading} />
            </Form.Item>
        </Form>
    )
}
