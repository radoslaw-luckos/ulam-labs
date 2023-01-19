import { createContext, useContext, useState } from "react"
import { CurrencyType } from "../utils/CurrencyType"
import { saveToLocalStorage } from "../utils/LocalStorage"
import AllCurrenciesContext from "./AllCurrenciesContext"

interface ContextProviderType {
    children: React.ReactNode
}

export enum UPDATE_TYPE {
    REMOVE = 'REMOVE',
    ADD = 'ADD'
}


const SelectedCurrenciesContext = createContext<any>(undefined)

export function SelectedCurrenciesProvider({ children }: ContextProviderType) {
    
    const [SelectedCurrencies, setSelectedCurrencies] = useState<CurrencyType[]>([])

    const {AllCurrencies} = useContext(AllCurrenciesContext)

    const updateSelectedCurrencies = (id: string, type: UPDATE_TYPE) => {
        if (type === UPDATE_TYPE.ADD) {
            if (SelectedCurrencies.length < 5) {                
                const itemToAdd: CurrencyType = AllCurrencies.find((el: CurrencyType) => el.id === id)
                if (!SelectedCurrencies.includes(itemToAdd)) {
                    const newArray: CurrencyType[] = [...SelectedCurrencies, itemToAdd]          
                    setSelectedCurrencies(newArray)
                    saveToLocalStorage(newArray) 
                } else {
                    alert('You have already selected this currency. Please add another one!')
                }
                
            } else {
                alert('You have already selected 5 currencies. Please remove one before adding another one!') 
            }           
        }
        if (type === UPDATE_TYPE.REMOVE) {
            const newArray: CurrencyType[] = SelectedCurrencies.filter((el:CurrencyType) => el.id !== id)
            setSelectedCurrencies(newArray)
            saveToLocalStorage(newArray)
        }
    }

    return (
        <SelectedCurrenciesContext.Provider value={{ SelectedCurrencies, setSelectedCurrencies, updateSelectedCurrencies }}>{children}</SelectedCurrenciesContext.Provider>
    )
}

export default SelectedCurrenciesContext