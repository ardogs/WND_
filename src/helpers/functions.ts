export const formatKRW = (value: number | string | undefined | null) => {
    // Si el valor no existe, devolvemos 0 wones
    if (value === undefined || value === null || value === '') return '₩0';

    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        // El Won raramente usa decimales, esto lo limpia (ej: 1,000 en lugar de 1,000.00)
        maximumFractionDigits: 0
    }).format(Number(value));
};