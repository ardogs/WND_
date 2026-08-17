import { useCallback, useEffect, useRef } from 'react'
import { FormInstance } from '../../../../components/atoms'
import { CheckItemKey, useQuotationStore } from '../../../../store/quotation/useQuotationStore'
import { QuotationFormType } from '../../components/quoteForm/QuoteForm.data'
import { CheckboxChangeEvent } from '../../../../components/atoms/checkbox/types'

interface Props {
  form: FormInstance<QuotationFormType>
}

const VAT_VALUE = 0.1
const DEBOUNCE_DELAY_MS = 250

export const useFormList = ({ form }: Props) => {
  const calculateSupplyPrice = useQuotationStore((state) => state.calculateSupplyPrice)
  const calculateVatperItem = useQuotationStore((state) => state.calculateVatperItem)
  const calculatePriceBeforeTaxes = useQuotationStore((state) => state.calculatePriceBeforeTaxes)
  const calculateTotalVat = useQuotationStore((state) => state.calculateTotalVat)
  const calculateTotalPrice = useQuotationStore((state) => state.calculateTotalPrice)
  const setAutomaticCalculation = useQuotationStore((state) => state.setAutomaticCalculation)
  const handleSendQuotation = useQuotationStore((state) => state.sendQuotationData)

  const isUpdatingRef = useRef(false)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const performCalculation = useCallback(() => {
    if (!form || isUpdatingRef.current) return

    const values = (form.getFieldsValue?.(true) || form.getValues?.() || {}) as QuotationFormType
    const items = values?.quotation_item || []

    const currentStore = useQuotationStore.getState()
    const shouldCalcSupply = currentStore.calculateSupplyPrice
    const shouldCalcItemVat = currentStore.calculateVatperItem
    const shouldCalcPreTax = currentStore.calculatePriceBeforeTaxes
    const shouldCalcTotVat = currentStore.calculateTotalVat
    const shouldCalcTotPrice = currentStore.calculateTotalPrice

    let sumSupplyPrice = 0
    let sumItemVat = 0

    isUpdatingRef.current = true
    try {
      items.forEach((item, index) => {
        const amount = Number(item?.amount) || 0
        const unitPrice = Number(item?.unit_price) || 0

        let itemSupply = Number(item?.supply_price) || 0
        if (shouldCalcSupply) {
          itemSupply = Math.round(amount * unitPrice)
          if (item?.supply_price !== itemSupply) {
            form.setFieldValue?.(['quotation_item', index, 'supply_price'], itemSupply)
          }
        }

        let itemVat = Number(item?.vat) || 0
        if (shouldCalcItemVat) {
          itemVat = Math.round(itemSupply * VAT_VALUE)
          if (item?.vat !== itemVat) {
            form.setFieldValue?.(['quotation_item', index, 'vat'], itemVat)
          }
        }

        sumSupplyPrice += itemSupply
        sumItemVat += itemVat
      })

      let finalPriceBeforeTaxes = Number(values?.price_before_taxes) || 0
      if (shouldCalcPreTax) {
        finalPriceBeforeTaxes = sumSupplyPrice
        if (values?.price_before_taxes !== sumSupplyPrice) {
          form.setFieldValue?.('price_before_taxes', sumSupplyPrice)
        }
      }

      let finalTotalVat = Number(values?.vat_total) || 0
      if (shouldCalcTotVat) {
        finalTotalVat = sumItemVat
        if (values?.vat_total !== sumItemVat) {
          form.setFieldValue?.('vat_total', sumItemVat)
        }
      }

      if (shouldCalcTotPrice) {
        const finalTotalPrice = finalPriceBeforeTaxes + finalTotalVat
        if (values?.total_price_number !== finalTotalPrice) {
          form.setFieldValue?.('total_price_number', finalTotalPrice)
        }
      }
    } finally {
      setTimeout(() => {
        isUpdatingRef.current = false
      }, 0)
    }
  }, [form])

  const scheduleCalculation = useCallback(
    (delay = DEBOUNCE_DELAY_MS) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      debounceTimerRef.current = setTimeout(() => {
        performCalculation()
      }, delay)
    },
    [performCalculation]
  )

  useEffect(() => {
    if (!form || typeof form.watch !== 'function') return

    const subscription = form.watch((_currentVal, { name }) => {
      if (isUpdatingRef.current) return
      if (
        !name ||
        name.startsWith('quotation_item') ||
        name === 'price_before_taxes' ||
        name === 'vat_total'
      ) {
        scheduleCalculation(DEBOUNCE_DELAY_MS)
      }
    })

    return () => {
      subscription.unsubscribe()
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [form, scheduleCalculation])

  const handleCheckBox = (event: CheckboxChangeEvent) => {
    const { checked, name } = event.target
    const key = name as CheckItemKey
    setAutomaticCalculation(key, checked)
    setTimeout(() => {
      performCalculation()
    }, 50)
  }

  const handleOnFieldChange = () => {
    scheduleCalculation(DEBOUNCE_DELAY_MS)
  }

  return {
    calculateVatperItem,
    calculateSupplyPrice,
    calculatePriceBeforeTaxes,
    calculateTotalVat,
    calculateTotalPrice,
    handleCheckBox,
    handleOnFieldChange,
    handleSendQuotation,
    updateTotals: performCalculation,
  }
}
