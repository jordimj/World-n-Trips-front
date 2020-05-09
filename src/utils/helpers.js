export const expenseEuroFormatter = expense => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(expense);
};

export const percentageFormatter = number => {
    return new Intl.NumberFormat("en-US", {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

export const deductNotDailyExpenses = (totalExpenses, expensesByCategories) => {
    const categoriesNotDailyExpenses = ['VISA', 'INTL TRANSPORT', 'INSURANCE'];

    const reducer = (accumulator, currentCategory) => {
        if (expensesByCategories[currentCategory]) {
            accumulator -= expensesByCategories[currentCategory];
        }
        return accumulator;
    };

    return categoriesNotDailyExpenses.reduce(reducer, totalExpenses);
}