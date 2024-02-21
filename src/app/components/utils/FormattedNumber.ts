export const formattedNumber = (number: number) =>
    number.toLocaleString('ru', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    })
