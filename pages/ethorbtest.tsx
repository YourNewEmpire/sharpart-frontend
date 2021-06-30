import { useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { useDispatch, useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'

import { EthOrbProps } from '../interfaces/pages'

import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'

export const getServerSideProps: GetServerSideProps = async (context) => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=6&interval=daily')
      const ethHistoric = await res.json()

      if (!ethHistoric) {
            return null
      }
      return {
            props: {
                  ethHistoric,
            },
      }
}

export default function EthOrb({ ethHistoric }: EthOrbProps) {
      const dispatch = useDispatch()
      const eth = useSelector(selectPrice)
      //* object for Line chart from react-chartjs2
      const ethPrices = {
            labels: ['30 seconds ago', '25 seconds ago', '20 seconds ago', '15 seconds ago', '10 seconds ago', '5 seconds ago', 'Now'],
            datasets: [
                  {
                        label: 'usd Price',
                        data: eth,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };


      const historicPrices = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Prices USD',
                        data: ethHistoric?.prices,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };
      const historicVolumes = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Volumes USD',
                        data: ethHistoric?.total_volumes,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };
      const historicMarketCaps = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Market Caps USD',
                        data: ethHistoric?.market_caps,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',

                  },

            ],
      };


      const fetchEth = () => {

            dispatch(setPriceThunk())
      }
      useInterval(fetchEth, 5000);

      return (
            <PageLayout>
                  <Heading title='Test page.' hScreen={false}/>
            </PageLayout>
      );

}
