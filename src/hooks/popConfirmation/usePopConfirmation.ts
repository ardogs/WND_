import { Form } from 'antd';
import { useState } from 'react'

export const usePopConfirmation = (next: () => void) => {

    const [open, setOpen] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const form = Form.useFormInstance();


    const showPopconfirm = () => {
        setOpen(true);
        setResult(false);
    };

    const handleOk = () => {
        setOpen(false);

        if (form) {
            form.submit();
            next();
        }
        setResult(true);
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
