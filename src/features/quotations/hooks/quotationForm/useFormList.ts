import { useCallback, useEffect, useRef } from 'react'

import { FormInstance } from '../../../../components/atoms';
import { CheckItemKey, useQuotationStore } from '../../../../store/quotation/useQuotationStore';
import { QuotationFormType, QuotationItem } from '../../components/quoteForm/QuoteForm.data';
import { CheckboxChangeEvent } from '../../../../components/atoms/checkbox/types';

interface Props{
    form: FormInstance<QuotationFormType>
}

const VAT_VALUE: number = 0.10;
export const useFormList = ({form}:Props) => {

    const calculateSupplyPrice = useQuotationStore(state => state.calculateSupplyPrice);
    const calculateVatperItem = useQuotationStore(state => state.calculateVatperItem);
    const calculatePriceBeforeTaxes = useQuotationStore(state => state.calculatePriceBeforeTaxes);
    const calculateTotalVat = useQuotationStore(state => state.calculateTotalVat);
    const calculateTotalPrice = useQuotationStore(state => state.calculateTotalPrice);
    const setAutomaticCalculation = useQuotationStore(state => state.setAutomaticCalculation);

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateTotals = useCallback(
        () => {
            setTimeout(() => {
                if (!calculatePriceBeforeTaxes && !calculateTotalVat && !calculateTotalPrice) {
                    return;
                }

                const { quotation_item = [] } = form.getFieldsValue();

                let priceBeforeTaxes = 0;
                let totalVat = 0;

                if (calculatePriceBeforeTaxes) {
                    priceBeforeTaxes = quotation_item.reduce(((acum, item) => acum + (item.supply_price || 0)), 0);
                    form.setFieldValue("price_before_taxes", priceBeforeTaxes);
                }

                if (calculateTotalVat) {
                    totalVat = quotation_item.reduce(((acum, item) => acum + (item.vat || 0)), 0);
                    form.setFieldValue("vat_total", totalVat);
                }

                if (calculateTotalPrice) {
                    const finalPrice = (calculatePriceBeforeTaxes ? priceBeforeTaxes : form.getFieldValue("price_before_taxes") || 0);
                    const finalVat = (calculateTotalVat ? totalVat : form.getFieldValue("vat_total") || 0);
                    form.setFieldValue("total_price_number", finalPrice + finalVat);
                }
            }, 0);
        },
        [calculatePriceBeforeTaxes, calculateTotalPrice, calculateTotalVat, form],
    )



    const handleCheckBox = (event: CheckboxChangeEvent) => {
        const { checked, name } = event.target;
        const key = name as CheckItemKey;
        setAutomaticCalculation(key, checked);

        // Si el usuario activa un check de total, recalculamos
        if (checked && (key === 'calculatePriceBeforeTaxes' || key === 'calculateTotalVat' || key === 'calculateTotalPrice')) {
            updateTotals();
        }
    }

    const handleOnFieldChange = (changedValues: { quotation_item: QuotationItem[] }, allValues: QuotationFormType) => {

        if (!changedValues?.quotation_item)
            return;

        if (!calculateSupplyPrice && !calculateVatperItem)
            return;

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        const changedList = changedValues.quotation_item;

        debounceTimeoutRef.current = setTimeout(() => {
            const changedIndex = changedList.findIndex(item => item !== undefined);
            if (changedIndex === -1) return;

            const itemThatChanged = changedList[changedIndex];
            if (!itemThatChanged || Object.keys(itemThatChanged).length > 1) return;

            const calculateSupplyPriceFlag = Object.keys(itemThatChanged).find(elem => (elem === 'amount' || elem === 'unit_price'));

            if (calculateSupplyPriceFlag) {
                const amount = allValues.quotation_item[changedIndex].amount || 0;
                const unit_price = allValues.quotation_item[changedIndex].unit_price || 0;

                let supplyPrice = allValues.quotation_item[changedIndex].supply_price || 0;
                let vat = allValues.quotation_item[changedIndex].vat || 0;

                if (calculateSupplyPrice) {
                    supplyPrice = Math.round(amount * unit_price) || 0;
                    form.setFieldValue(['quotation_item', changedIndex, 'supply_price'], supplyPrice);

                    if (calculateVatperItem) {
                        vat = Math.round(supplyPrice * VAT_VALUE) || 0;
                        form.setFieldValue(['quotation_item', changedIndex, 'vat'], vat);
                    }
                }
            }
            updateTotals();

            debounceTimeoutRef.current = null;
        }, 700);
    }



    useEffect(() => {
        if (!calculateSupplyPrice) return;

        const { quotation_item } = form.getFieldsValue();
        if (quotation_item) {
            quotation_item.forEach(({ amount = 0, unit_price = 0 }, index) => {
                const newSupplyPrice = Math.round((amount * unit_price) || 0);
                form.setFieldValue(['quotation_item', index, 'supply_price'], newSupplyPrice);

                if (calculateVatperItem) {
                    const newVat = Math.round(newSupplyPrice * VAT_VALUE) || 0;
                    form.setFieldValue(['quotation_item', index, 'vat'], newVat);
                }
            });

            updateTotals();
        }
    }, [calculateSupplyPrice, calculateVatperItem, form, updateTotals]);

    useEffect(() => {
        if (!calculateVatperItem) return;
        if (calculateSupplyPrice) return;

        const { quotation_item } = form.getFieldsValue();
        if (quotation_item) {
            quotation_item.forEach(({ supply_price = 0 }, index) => {
                const vat = Math.round(supply_price * VAT_VALUE) || 0;
                form.setFieldValue(['quotation_item', index, 'vat'], vat);
            });

            updateTotals();
        }
    }, [calculateVatperItem, calculateSupplyPrice, form, updateTotals]);

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return {
        // form,
        calculateVatperItem,
        calculateSupplyPrice,
        calculatePriceBeforeTaxes,
        calculateTotalVat,
        calculateTotalPrice,
        handleCheckBox,
        handleOnFieldChange
    }
}
