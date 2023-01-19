import { useContext } from 'react'
import CurrencyDataCard from './CurrencyDataCard'
import styles from '../styles/CurrenciesDataGrid.module.scss'
import SelectedCurrenciesContext from '../state/SelectedCurrenciesContext'
import { CurrencyType } from '../utils/CurrencyType'


const CurrenciesDataGrid = () => {
  
  const { SelectedCurrencies } = useContext(SelectedCurrenciesContext)  

  return (
    <ul className={styles.grid}>
        {SelectedCurrencies.length > 0 ? SelectedCurrencies.map((currency: CurrencyType) => <CurrencyDataCard key={currency.id} currency={currency}/>) : <p>You don't have any currency selected to watch! Please, feel free to add one using the form above.</p>}
    </ul>
  )
}

export default CurrenciesDataGrid