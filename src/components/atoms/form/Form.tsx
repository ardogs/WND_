import { Form as AntForm, FormProps as AntFormProps } from 'antd';
import React from 'react';


interface FormProps<T> extends Omit<AntFormProps<T>, 'children'> {
    children: React.ReactNode;
}

const FormWrapper = <T,>({ children, ...rest }: FormProps<T>) => {

    return (<AntForm<T> {...rest}> {children} </AntForm>)
}

export const Form = Object.assign( FormWrapper, {
    useForm: AntForm.useForm,
    Item: AntForm.Item,
    List: AntForm.List,
    Provider: AntForm.Provider,
    useFormInstance: AntForm.useFormInstance,
    useWatch: AntForm.useWatch, 
    ErrorList: AntForm.ErrorList
} )