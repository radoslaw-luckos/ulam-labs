import { useContext, useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Colors, Legend, ChartOptions, TimeScale } from 'chart.js'
import styles from '../styles/Chart.module.scss'
import { getSelectedCurrenciesFromLocalStorage } from '../utils/LocalStorage'
import 'chartjs-adapter-moment'
import axios from 'axios'
import SelectedCurrenciesContext from '../state/SelectedCurrenciesContext'

type dataPointType = {
    x: number;
    y: number
}

type DatasetType = {
    label: string
    data: dataPointType[]
    showLine: boolean
}

type ChartData = {
    datasets: DatasetType[]
}


const PricesChartComponent = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const [chartData, setChartData] = useState<ChartData>({
        datasets: []
    })
    const {SelectedCurrencies} = useContext(SelectedCurrenciesContext)

    useEffect(() => {
        const selectedCurrenciesIDs = getSelectedCurrenciesFromLocalStorage()
        const urls = selectedCurrenciesIDs.map((id: string) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`)
        const requests = urls.map((url:string) => axios.get(url))
        Promise.all(requests)
            .then(async (responses) => {   
                const datasets: DatasetType[] = []
                responses.forEach(async (res) => {
                    const id: string = res.request.responseURL.split('/')[6]
                    const x: number[] = (res.data.prices.map((el: number[]) => el[0]));
                    const y: number[] = (res.data.prices.map((el: number[]) => el[1]));
                    
                    const LineArray = x.map((xvalue, index) => {
                        const lineObj: dataPointType = {
                            x: xvalue,
                            y: y[index]
                        }
                        return lineObj
                    })
                    datasets.push({
                        label: id,
                        data: LineArray,
                        showLine: true
                    })
                })
                setChartData({...chartData, datasets: datasets})         
            })
            .catch(err => {
                setError(err)
              })
            .finally(() => {        
                setIsLoading(false)                 
            }) 
    }, [SelectedCurrencies])
    

    ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, CategoryScale, Colors, Legend)

        
    
    const options: ChartOptions<'scatter'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
              },
            title: {
                display: true,
                text: 'Price in last 24h',
                padding: {
                    top: 10,
                    bottom: 10
                }
            },
        }
    }

    return (
        <div className={styles.ChartContainer}>
            {error instanceof Error && <p className={styles.error}>{`Error occured: ${error.message}`}</p>}
            {!isLoading && <Scatter data={chartData} options={options}></Scatter>}            
        </div>
    )
}

export default PricesChartComponent


