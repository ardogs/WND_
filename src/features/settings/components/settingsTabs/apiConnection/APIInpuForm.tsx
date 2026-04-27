import { Form } from "../../../../../components/atoms"
import { Input } from '../../../../../components/atoms/input/Input';
import { Button } from "../../../../../components/atoms";
import { useSettings } from "../../../../../hooks";



interface FormType {
    apiURL: string
}


export const APIInpuForm = () => {
    const [form] = Form.useForm<FormType>();
    const { apiURL, apiURLisLoading, handleApiUrl } = useSettings();

    const initialValues: FormType = {
        apiURL: apiURL
    }

    

    return (
        <Form onFinish={(value) => handleApiUrl(value.apiURL)} layout="inline" className="api-input-form" disabled={apiURLisLoading} form={form} initialValues={initialValues}>
            <Form.Item name='apiURL' rules={[{ required: true, message: 'This field is requiered' }, { type: 'url', message: "Please set a valid API adress" }]}>
                <Input placeholder="https://localhost/" value={apiURL}/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" text="Guardar" loading={apiURLisLoading} />
            </Form.Item>
        </Form>
    )
}
