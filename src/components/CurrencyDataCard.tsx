import { useContext, useEffect, useState} from 'react'
import styles from '../styles/CurrencyDataCard.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import { CurrencyType } from '../utils/CurrencyType'
import SelectedCurrenciesContext,{ UPDATE_TYPE } from '../state/SelectedCurrenciesContext' 

type Props = {
    currency: CurrencyType
}

type CurrencyDetailsType = {
    name: string,
    price: number
}

const CurrencyDataCard = ({ currency }: Props) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const [data, setData] = useState<CurrencyDetailsType | undefined>()
    
    useEffect(() => {       
   
        axios.get(`https://api.coingecko.com/api/v3/coins/${currency.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(res => {  
            const currencyDetails: CurrencyDetailsType = {
                name: res.data.name,
                price: res.data.market_data.current_price.usd
            }
            setData(currencyDetails)  
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    }, [])  
    
   
    const { updateSelectedCurrencies } = useContext(SelectedCurrenciesContext)
    
    const handleCurrencyRemoval = () => {         
        updateSelectedCurrencies(currency.id, UPDATE_TYPE.REMOVE)
    }

    return (
        <>            
            {isLoading && <p>Data is loading! Please wait!</p>}
            {error instanceof Error && <p className={styles.error}>{`Error occured: ${error.message}`}</p>}
            {data &&
            <li className={styles.card}>
                <div className={styles.cardData}>
                    <h1>{data.name}</h1>
                    <button className={styles.cardRemoveBtn} onClick={() => handleCurrencyRemoval()}>
                        <FaRegTrashAlt />
                    </button>
                </div>
                <div className={styles.cardPrice}>
                    <h2>{data.price}$</h2>
                </div>
            </li>} 
        </>
    )
}

export default CurrencyDataCard