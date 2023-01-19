import { CurrencyType } from "./CurrencyType"

export enum LS_ITEM_NAME {
    SELECTED = 'selectedCurrencies'
}

// gets item from local storage and returns array o strings (which are currencies ids)
export const getSelectedCurrenciesFromLocalStorage = () => {
    const localStorageItem: string | null = localStorage.getItem(LS_ITEM_NAME.SELECTED)
    const currenciesArray: string[] = localStorageItem?.length ? localStorageItem?.split(",") : []
    return currenciesArray
}

//gets array of currency objects and creates new array of currencies ids, converts it to string and saves to localStorage
export const saveToLocalStorage = (currencies: CurrencyType[]) => {
    const newItem: string = currencies.map((currency: CurrencyType) => currency.id).toString()
    if (newItem) {
        localStorage.setItem(LS_ITEM_NAME.SELECTED, newItem)
    }

}

