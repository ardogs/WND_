import { UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { ReactNode } from 'react'

export interface EnhancedFormInstance<TFieldValues extends FieldValues = FieldValues> extends UseFormReturn<TFieldValues> {
  getFieldsValue: (all?: boolean) => TFieldValues
  getFieldValue: <TName extends Path<TFieldValues>>(name: TName) => any
  setFieldsValue: (values: Partial<TFieldValues>) => void
  setFieldValue: (name: string | (string | number)[], value: any) => void
  validateFields: (nameList?: string[]) => Promise<TFieldValues>
  resetFields: () => void
  submit: () => void
}

export type FormInstance<T extends FieldValues = any> = EnhancedFormInstance<T>

export interface FormItemRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  type?: string
  validator?: (rule: FormItemRule, value: any) => Promise<void>
}

export interface FormItemProps {
  name?: string | (string | number)[]
  label?: ReactNode
  rules?: FormItemRule[]
  layout?: 'horizontal' | 'vertical' | 'inline'
  children?: ReactNode | ((fieldProps: any) => ReactNode)
  className?: string
  style?: React.CSSProperties
  valuePropName?: string
  initialValue?: any
  help?: ReactNode
  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | ''
}

export interface ValidateErrorEntity<T = any> {
  values: T
  errorFields: { name: (string | number)[]; errors: string[] }[]
  outOfDate: boolean
}