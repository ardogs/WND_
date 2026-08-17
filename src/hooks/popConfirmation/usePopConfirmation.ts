import { Form } from '../../components/atoms'
import { useState } from 'react'
import { toast } from 'sonner'

export const usePopConfirmation = (next: () => void) => {

    const [open, setOpen] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const form = Form.useFormInstance();


    const showPopconfirm = () => {
        setOpen(true);
        setResult(false);
    };

    const handleOk = async () => {
        setOpen(false);

        if (form) {
            try {
                await form.validateFields();
                if ((form as any)._onFinish) {
                    const values = form.getFieldsValue(true);
                    const success = await (form as any)._onFinish(values);
                    if (success === false) {
                        return;
                    }
                }
                next();
                setResult(true);
            } catch (error) {
                console.error('Validación falló antes de enviar:', error);
                toast.error('Hay campos obligatorios incompletos o con formato inválido.');
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setResult(false)
    };
    return {
        open,
        result,
        showPopconfirm,
        handleOk,
        handleCancel,
    }
}
