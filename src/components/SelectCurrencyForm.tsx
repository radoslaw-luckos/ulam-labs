import { useState, useContext } from 'react'
import styles from '../styles/SelectCurrencyForm.module.scss'
import AllCurrenciesContext from '../state/AllCurrenciesContext'
import SelectedCurrenciesContext, {UPDATE_TYPE} from '../state/SelectedCurrenciesContext'
import { CurrencyType } from '../utils/CurrencyType'


const SelectCurrencyForm = () => {
  
  
  const { AllCurrencies } = useContext(AllCurrenciesContext)
  const { updateSelectedCurrencies } = useContext(SelectedCurrenciesContext)
  
  const [currencyToAdd, setCurrencyToAdd] = useState<string>(AllCurrencies[0].id)

  const handleCurrencyToAddChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idToAddToSelected = AllCurrencies.find((currency: CurrencyType) => currency.name === event.target.value).id
    setCurrencyToAdd(idToAddToSelected)
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {   
    event.preventDefault()
    updateSelectedCurrencies(currencyToAdd, UPDATE_TYPE.ADD)    
  }

  return (
    <form className={styles.selectForm} onSubmit={handleSubmit}>
      <div className={styles.selectFormGroup}>
        <label data-testid='selectLabel' htmlFor="currency-symbol" className={styles.selectFormGroupLabel}>Select another currency!</label>
        <select data-testid='selectField' name="currency-symbol" id="currency-symbol" className={styles.selectFormGroupInput} onChange={handleCurrencyToAddChange}>
          {AllCurrencies.map((currency: CurrencyType) => <option key={currency.id} className={styles.selectFormGroupInputOption}>{currency.name}</option>)}
        </select>
      </div>      
      <button type="submit" className={styles.selectFormSubmitBtn} data-testid='submitBtn'>Select</button>
    </form>
  )
}

export default SelectCurrencyForm