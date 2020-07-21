function formatNumber(value) {
    return Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
}

function format2Digits(value) {
    return Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 }).format(value);
}

function formatValue(value) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getMonthName(month) {
    let monthName = '';
    switch (parseInt(month)) {
        case 1:
            monthName = 'Janeiro';
            break;
        case 2:
            monthName = 'Feveveiro';
            break;
        case 3:
            monthName = 'Março';
            break;
        case 4:
            monthName = 'Abril';
            break;
        case 5:
            monthName = 'Maio';
            break;
        case 6:
            monthName = 'Junho';
            break;
        case 7:
            monthName = 'Julho';
            break;
        case 8:
            monthName = 'Agosto';
            break;
        case 9:
            monthName = 'Setembro';
            break;
        case 10:
            monthName = 'Outubro';
            break;
        case 11:
            monthName = 'Novembro';
            break;
        case 12:
            monthName = 'Dezembro';
            break;
        default:
            monthName = '?????????????';
            break;
    }

    return monthName;
}

export default { formatNumber, getMonthName, formatValue, format2Digits };
