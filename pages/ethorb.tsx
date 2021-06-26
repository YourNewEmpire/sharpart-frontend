import { useEffect } from 'react'
import Moralis from 'moralis'
import { useMoralis, } from 'react-moralis'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../hooks/useInterval'
import {
      selectAccount,
      selectUris,
      resetUris,
      setUrisThunk,
      setAccount,
} from '../lib/slices/accountSlice';
import {
      selectHistoric,
      selectPrice,
      setPriceThunk
} from '../lib/slices/ethpriceSlice'
import {
      selectError,
      selectGameWin,
      setError,
      selectChoice,
      ethOrb,
      setChoiceUp,
      setChoiceDown,
      selectLoading,
      selectGameResult,
      selectResults,
      fetchUserScores,
} from '../lib/slices/gameSlice';
import ModalCard from '../components/Cards/ModalCard';
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import NftList from '../components/Cards/NftList';
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'


export default function EthOrb() {
      const dispatch = useDispatch()
      const tokens = useSelector(selectUris)
      const eth = useSelector(selectPrice)
      const ethHistoric = useSelector(selectHistoric)
      const choice = useSelector(selectChoice)
      const gameWin = useSelector(selectGameWin)
      const gameResult = useSelector(selectGameResult)
      const scores = useSelector(selectResults)
      const gameLoading = useSelector(selectLoading)

      //* moralis state/hook
      const { isAuthenticated, user } = useMoralis()
      const address = user?.get('ethAddress')
      const authData = user?.get('authData')
      const userSign = authData?.moralisEth.signature
      const gameRes = Moralis.Object.extend("GameResults")
      const gameResQuery = new Moralis.Query(gameRes)

      async function playGame() {

            if (!address || eth == 0 || choice === null) {
                  console.log('no addres or what')
                  dispatch(setError('no address, eth price, choice was found'))
            }
            else if (!isAuthenticated) {
                  //this shouldnt happen because the markup should be re-rendered. jic
                  console.log('no auth data foound')
                  dispatch(setError('User not authenticated'))
            }
            else {
                  //set a gamesession then post backend
                  dispatch(ethOrb(address, eth, choice, userSign))
            }
      }

      const fetchScores = () => {
            dispatch(fetchUserScores(address))
      }
      const fetchEth = () => {
            dispatch(setPriceThunk())
      }

      useInterval(fetchEth, 5000);

      /*
      useEffect(() =>{
            dispatch(setUrisThunk(address))
      }, [user])
*/
      if (!isAuthenticated || !address) return (

            <div className="flex items-center justify-center py-10">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />
            </div>
      )

      //todo: rebuild layout
      //todo: populate with game redux state neatly
      //todo tableHeaders.map for DRY code.
      else return (
            <PageLayout>
                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32 ">
                        <div className="flex flex-col items-center">

                              <SimpleCard title="Welcome" body={address} />

                              <p className="py-8 text-th-primary-light">Price of ETH in USD is ${eth}</p >

                              <ModalCard
                                    body="Where will the price (usd) of Eth be in 2 minutes? "
                                    action1={
                                          <button
                                                onClick={() => dispatch(setChoiceUp())}
                                                className={choice === true ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-success  focus:outline-none   transition duration-300 ease-in-out'
                                                      : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                          >
                                                Mooning
                                          </button>
                                    }
                                    action2={
                                          <button
                                                onClick={() => dispatch(setChoiceDown())}
                                                className={choice === false ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-failure  focus:outline-none   transition duration-300 ease-in-out'
                                                      : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                          >
                                                Dropping
                                          </button>
                                    }
                              />


                              {choice !== null && <button onClick={playGame} className='m-6 text-th-accent-success' >Play Game</button>}
                              {gameLoading && <p className="text-th-primary-light" ><svg className="animate-spin h-5 w-5"> </svg> game is loading </p>}
                              {gameResult && <AlertCard title={gameResult} body={gameWin ? 'Well Done Bro. You`re making a name for yourself now! :> ' : 'Unlucky chad...'} success={gameWin ? true : false} failure={!gameWin ? false : true} />}
                        </div>


                  </div>

                  <div className="
                  grid grid-flow-col gap-4 md:gap-12 lg:gap-20 
                  items-center justify-center  
                   ">
                        <div className="bg-th-primary-dark rounded-lg p-2 md:p-4 lg:p-8">
                              <Heading title="Your Current Scores" />
                              <div className="flex items-center justify-center">
                                    <button
                                          className='   items-center lg:h-16 lg:w-16 w-6 h-6
                                          antialiased focus:outline-none text-th-primary-light
                                          hover:shadow-lg rounded-lg 
                                          transition duration-100 ease-in-out transform  hover:scale-125 '
                                          onClick={() => fetchScores()}
                                    >
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                          </svg>

                                    </button>
                              </div>

                              <table className="table-auto m-2 md:m-8 lg:m-14">
                                    <thead className=" text-th-primary-light border-b-2 border-th-primary-light ">
                                          <tr className="">
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">games played</th>
                                                <th className="text-center p-5  border-l-2 border-r-2 border-th-primary-light">choice</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">result</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">win?</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">old eth</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">new eth</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">date</th>
                                          </tr>
                                    </thead>
                                    <tbody className="text-th-primary-light ">
                                          {scores.map((item, index) =>
                                                <tr className=" border-b-4 border-th-primary-light rounded-b-lg" key={index}>
                                                      <td className="text-center p-5 ">{index + 1}</td>
                                                      <td className="text-center p-5">{item.gameChoice}</td>
                                                      <td className="text-center p-5">{item.gameResult}</td>
                                                      <td className="text-center p-5">{item.gameWin}</td>
                                                      <td className="text-center p-5">$ {item.oldPrice}</td>
                                                      <td className="text-center p-5">$ {item.newPrice}</td>
                                                      <td className="text-center p-5">{item.gameDate}</td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </PageLayout>
      );

}
