import React, { ReactNode, useEffect, useRef, createContext, useContext } from 'react'
import {
  useForm as useRHFForm,
  useFormContext as useRHFFormContext,
  useWatch as useRHFWatch,
  useFieldArray as useRHFFieldArray,
  Controller,
  FormProvider,
  FieldValues,
  UseFormProps,
} from 'react-hook-form'
import {
  EnhancedFormInstance,
  FormItemProps,
} from './types'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormLayoutContextProps {
  layout?: 'horizontal' | 'vertical' | 'inline'
}

const FormLayoutContext = createContext<FormLayoutContextProps>({
  layout: 'horizontal',
})

function convertNameToPath(name?: string | (string | number)[]): string {
  if (!name) return ''
  if (Array.isArray(name)) {
    return name.join('.')
  }
  return String(name)
}

function enhanceForm<T extends FieldValues>(form: any): EnhancedFormInstance<T> {
  if (form._enhanced) return form

  form._isProgrammatic = false

  form.getFieldsValue = (_all?: boolean) => {
    return form.getValues()
  }

  form.getFieldValue = (name: any) => {
    const path = convertNameToPath(name)
    return form.getValues(path)
  }

  form.setFieldsValue = (values: Partial<T>) => {
    if (!values) return
    form._isProgrammatic = true
    try {
      Object.entries(values).forEach(([key, val]) => {
        form.setValue(key as any, val, {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        })
      })
    } finally {
      setTimeout(() => {
        form._isProgrammatic = false
      }, 0)
    }
  }

  form.setFieldValue = (name: any, value: any) => {
    const path = convertNameToPath(name)
    form._isProgrammatic = true
    try {
      form.setValue(path as any, value, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      })
    } finally {
      setTimeout(() => {
        form._isProgrammatic = false
      }, 0)
    }
  }

  form.validateFields = async (nameList?: string[]) => {
    const valid = await form.trigger(nameList as any)
    if (!valid) {
      throw new Error('Validation failed')
    }
    return form.getValues()
  }

  form.resetFields = () => {
    form.reset()
  }

  form.submit = () => {
    if (form._onFinish) {
      form.handleSubmit(form._onFinish)()
    }
  }

  form._enhanced = true
  return form
}

export function useForm<T extends FieldValues = FieldValues>(
  options?: UseFormProps<T>
): [EnhancedFormInstance<T>] {
  const methods = useRHFForm<T>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...options,
  })
  const enhanced = enhanceForm<T>(methods)
  return [enhanced]
}

export function useFormInstance<T extends FieldValues = any>(): EnhancedFormInstance<T> {
  const methods = useRHFFormContext<T>()
  if (!methods) {
    return enhanceForm<T>({
      getValues: () => ({}),
      setValue: () => {},
      trigger: async () => true,
      reset: () => {},
      watch: () => {},
    })
  }
  return enhanceForm<T>(methods)
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  layout: propLayout,
  children,
  className,
  style,
  valuePropName = 'value',
  validateStatus,
  help,
}) => {
  const form = useFormInstance()
  const path = convertNameToPath(name)
  const { layout: contextLayout } = useContext(FormLayoutContext)
  const layout = propLayout || contextLayout || 'vertical'

  const isRequired = rules.some((r) => r.required)
  const isHorizontal = layout === 'horizontal'
  const isInline = layout === 'inline'

  const rhfRules: any = {}
  rules.forEach((rule) => {
    if (rule.required) {
      rhfRules.required = rule.message || 'Este campo es requerido'
    }
    if (rule.min !== undefined) {
      rhfRules.min = { value: rule.min, message: rule.message || `Mínimo ${rule.min}` }
    }
    if (rule.max !== undefined) {
      rhfRules.max = { value: rule.max, message: rule.message || `Máximo ${rule.max}` }
    }
    if (rule.pattern) {
      rhfRules.pattern = { value: rule.pattern, message: rule.message || 'Formato no válido' }
    }
    if (rule.type === 'url') {
      rhfRules.pattern = {
        value: /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i,
        message: rule.message || 'Ingresa una URL válida',
      }
    }
    if (rule.validator) {
      rhfRules.validate = async (val: any) => {
        try {
          await rule.validator!(rule, val)
          return true
        } catch (err: any) {
          return err?.message || rule.message || 'Error de validación'
        }
      }
    }
  })

  if (!name) {
    return (
      <div
        className={cn(
          isInline
            ? 'inline-flex items-center h-full shrink-0'
            : isHorizontal
            ? 'flex flex-row items-center justify-between gap-1.5'
            : 'flex flex-col gap-1.5',
          className
        )}
        style={style}
      >
        {label && (
          <Label className="text-sm font-medium text-foreground/90 mr-2">
            {label}
            {isRequired && <span className="text-destructive ml-0.5">*</span>}
          </Label>
        )}
        {typeof children === 'function' ? (children as any)({}) : children}
        {help && <p className="text-xs text-muted-foreground">{help}</p>}
      </div>
    )
  }

  return (
    <Controller
      control={form.control}
      name={path as any}
      rules={rhfRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error || validateStatus === 'error'
        const errorMessage = fieldState.error?.message || (typeof help === 'string' ? help : undefined)

        const childProps: any = {
          ...field,
          status: hasError ? 'error' : undefined,
          [valuePropName]: field.value !== undefined ? field.value : '',
          onChange: (...args: any[]) => {
            const e = args[0]
            if (e && e.target && valuePropName in e.target) {
              field.onChange(e.target[valuePropName])
            } else {
              field.onChange(e)
            }
          },
        }

        return (
          <div
            className={cn(
              isInline
                ? 'inline-flex items-center relative h-full flex-1 min-w-0'
                : isHorizontal
                ? 'flex flex-row items-center justify-between gap-1 w-full'
                : 'flex flex-col gap-1 w-full',
              className
            )}
            style={style}
          >
            {label && (
              <Label className={cn('text-sm font-medium text-foreground/90 select-none mr-2', hasError && 'text-destructive')}>
                {label}
                {isRequired && <span className="text-destructive ml-0.5">*</span>}
              </Label>
            )}

            <div className={cn(isInline ? 'flex items-center h-full w-full' : 'w-full')}>
              {typeof children === 'function'
                ? (children as any)(childProps)
                : React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement<any>, childProps)
                : children}
            </div>

            {hasError && errorMessage && (
              <p
                className={cn(
                  'text-xs font-medium text-destructive mt-0.5 animate-in fade-in-50',
                  isInline && 'absolute -bottom-5 left-0 whitespace-nowrap'
                )}
              >
                {errorMessage}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

interface FormListProps {
  name: string
  children: (
    fields: { name: number; key: number }[],
    operations: {
      add: (defaultValue?: any, insertIndex?: number) => void
      remove: (index: number | number[]) => void
      move: (from: number, to: number) => void
    }
  ) => ReactNode
}

const FormList: React.FC<FormListProps> = ({ name, children }) => {
  const form = useFormInstance()
  const { fields, append, remove, move } = useRHFFieldArray({
    control: form.control,
    name: name as any,
  })

  const mappedFields = fields.map((item: any, index: number) => ({
    name: index,
    key: index,
    id: item.id,
  }))

  const operations = {
    add: (defaultValue?: any) => append(defaultValue),
    remove: (index: number | number[]) => remove(index as any),
    move: (from: number, to: number) => move(from, to),
  }

  return <>{children(mappedFields, operations)}</>
}

export interface FormProps<T extends FieldValues = any>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onFinish'> {
  form?: EnhancedFormInstance<T>
  initialValues?: Partial<T>
  onFinish?: (values: T) => void | Promise<void>
  onValuesChange?: (changedValues: any, allValues: T) => void
  layout?: 'horizontal' | 'vertical' | 'inline'
  preserve?: boolean
  validateMessages?: any
  disabled?: boolean
  children?: ReactNode
}

const FormWrapper = <T extends FieldValues = any>({
  form: propForm,
  initialValues,
  onFinish,
  onValuesChange,
  children,
  className,
  disabled = false,
  layout = 'horizontal',
  ...rest
}: FormProps<T>) => {
  const [internalForm] = useForm<T>({ defaultValues: initialValues as any })
  const activeForm = propForm || internalForm
  const enhanced = enhanceForm<T>(activeForm)
  ;(enhanced as any)._onFinish = onFinish

  const prevValuesRef = useRef<any>(enhanced.getValues())

  useEffect(() => {
    if (!onValuesChange) return

    const subscription = enhanced.watch((currentValues, { name }) => {
      if (name && (enhanced as any)._isProgrammatic !== true) {
        const changedValues = { [name]: (currentValues as any)[name] }
        onValuesChange(changedValues, currentValues as T)
      }
      prevValuesRef.current = currentValues
    })

    return () => subscription.unsubscribe()
  }, [enhanced, onValuesChange])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (disabled) return

    if (onFinish) {
      enhanced.handleSubmit(async (values) => {
        await onFinish(values as T)
      })(e)
    }
  }

  return (
    <FormLayoutContext.Provider value={{ layout }}>
      <FormProvider {...enhanced}>
        <form
          onSubmit={handleSubmit}
          className={cn(
            layout === 'inline' ? 'flex flex-row items-center gap-2' : 'w-full',
            className
          )}
          {...rest}
        >
          <fieldset disabled={disabled} className="contents">
            {children}
          </fieldset>
        </form>
      </FormProvider>
    </FormLayoutContext.Provider>
  )
}

export const Form = Object.assign(FormWrapper, {
  useForm,
  useFormInstance,
  useWatch: useRHFWatch,
  Item: FormItem,
  List: FormList,
  Provider: FormProvider,
  ErrorList: () => null,
})