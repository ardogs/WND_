import { Form } from '../../../../components/atoms'
import { Steps, CompanyDataSelector } from '../../../../components/organisms'
import { StepsContent, useCompanyDataForm } from '../../../../hooks'
// import { useAuthStore } from '../../../../store/settings/useAuthStore'
import { useFormList } from '../../hooks/quotationForm'
import { QuoteGetFile } from '../quoteGetFile'
import { QuoteBody } from '../quoteInformation'
import { QuoteInformationReview } from '../quoteReview'

import { initialValues, QuotationFormType } from './QuoteForm.data'



const validateMessages = {
    default: 'Field validation error for ${label}',
    // required: '${label} is mandatory',
    required: 'Campo obliogatorio',
    enum: '${label} must be one of [${enum}]',
    whitespace: '${label} cannot be a blank character',
    // date: {
    //     format: '${label} date format is invalid',
    //     parse: '${label} cannot be converted to a date',
    //     invalid: '${label} is an invalid date',
    // },
    // types: {
    //     string: typeTemplate,
    //     method: typeTemplate,
    //     array: typeTemplate,
    //     object: typeTemplate,
    //     number: typeTemplate,
    //     date: typeTemplate,
    //     boolean: typeTemplate,
    //     integer: typeTemplate,
    //     float: typeTemplate,
    //     regexp: typeTemplate,
    //     email: typeTemplate,
    //     url: typeTemplate,
    //     hex: typeTemplate,
    // },
    // string: {
    //     len: '${label} must be ${len} characters',
    //     min: '${label} must be at least ${min} characters',
    //     max: '${label} must be up to ${max} characters',
    //     range: '${label} must be between ${min}-${max} characters',
    // },
    // number: {
    //     len: '${label} must be equal to ${len}',
    //     min: '${label} must be minimum ${min}',
    //     max: '${label} must be maximum ${max}',
    //     range: '${label} must be between ${min}-${max}',
    // },
    // array: {
    //     len: 'Must be ${len} ${label}',
    //     min: 'At least ${min} ${label}',
    //     max: 'At most ${max} ${label}',
    //     range: 'The amount of ${label} must be between ${min}-${max}',
    // },
    // pattern: {
    //     mismatch: '${label} does not match the pattern ${pattern}',
    // },
}

const steps: StepsContent[] = [
    { title: 'Información del proveedor', content: <CompanyDataSelector mode='default' />, },
    { title: 'Detalles de la cotización', content: <QuoteBody />, },
    { title: 'Resumen de la cotización', content: <QuoteInformationReview />, },
    { title: 'Obtener archivo', content: <QuoteGetFile />, },
];

export const QuoteForm = () => {

    const [form] = Form.useForm<QuotationFormType>();
    useCompanyDataForm({ quotationForm: form });
    

    const handleOnFinish = () => {
        console.log("heeehee", form.getFieldsValue(true))
        
    }
    const { handleOnFieldChange } = useFormList({ form });

    return (
        <Form initialValues={initialValues} preserve={true} onFinish={handleOnFinish} form={form} validateMessages={validateMessages} onValuesChange={handleOnFieldChange}>
            <Steps stepsArray={steps} />
        </Form>
    )
}
