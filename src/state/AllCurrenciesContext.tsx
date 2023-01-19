import { createContext, useState } from "react"
import { CurrencyType } from "../utils/CurrencyType"

interface ContextProviderType {
    children: React.ReactNode
}

const AllCurrenciesContext = createContext<any>(undefined)

export function AllCurrenciesProvider({ children }: ContextProviderType) {
    
    const [AllCurrencies, setAllCurrencies] = useState<CurrencyType[]>([])

    return (
        <AllCurrenciesContext.Provider value={{ AllCurrencies, setAllCurrencies }}>{children}</AllCurrenciesContext.Provider>
    )
}

export default AllCurrenciesContext