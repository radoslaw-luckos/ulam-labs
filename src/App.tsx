import axios from "axios"
import styles from './styles/App.module.scss'
import SelectCurrencyForm from './components/SelectCurrencyForm'
import { useEffect, useContext, useState} from 'react';
import AllCurrenciesContext from './state/AllCurrenciesContext'
import SelectedCurrenciesContext from './state/SelectedCurrenciesContext';
import { getSelectedCurrenciesFromLocalStorage } from './utils/LocalStorage';
import PricesChartComponent from './components/PricesChartComponent';
import { CurrencyType } from "./utils/CurrencyType";
import CurrenciesDataGrid from "./components/CurrenciesDataGrid";


type Props = {}

const App = (props: Props) => {
  
  
 
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const { AllCurrencies, setAllCurrencies } = useContext(AllCurrenciesContext)
  const { setSelectedCurrencies } = useContext(SelectedCurrenciesContext)
  
  useEffect(() => {

    const localStorageInitialValue = getSelectedCurrenciesFromLocalStorage()

    axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => {  
        setAllCurrencies(res.data)
        const array: CurrencyType[] = []
        localStorageInitialValue.forEach((el) => {
          const newEl =res.data.find((obj: CurrencyType) => obj.id === el)
          array.push(newEl)      
        }) 
        setSelectedCurrencies(array)
        
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {        
        setIsLoading(false)
      })    
   
  }, [])
   
   

  return (
    <main className={styles.container}>
      <header className={styles.contentHeader}>
        <h1 className={styles.contentHeaderTitle}>Watch your favorite currencies!</h1>
      </header>
      {isLoading && <p>Data is loading! Please wait!</p>}
      {error instanceof Error && <p className={styles.error}>{`Error occured: ${error.message}`}</p>}
      {AllCurrencies.length && <SelectCurrencyForm/>}   
      <CurrenciesDataGrid />
      <PricesChartComponent />     
    </main>
  )
}

export default App
