import { useDispatch, useSelector } from 'react-redux'
import { selectResults, fetchUserScores } from '../../lib/slices/gameSlice';
import Heading from "../Typography/Heading";

interface Props {
      address: string;
}


//TODO This totally needs optimising for more reusability.
//? Just being introduced.

export default function UserScoreTable({ address }: Props): JSX.Element {
      const scores = useSelector(selectResults)
      const dispatch = useDispatch()

      //todo - useEffect and fetch scores when the address changes/ after it renders.

      const fetchScores = () => {
            dispatch(fetchUserScores(address))
      }

      
      return (
            <div className=" bg-th-background min-h-full">
              
                        <div className="
                        grid grid-flow-row gap-4 md:gap-12 lg:gap-20 
                        items-center justify-center
                        bg-th-primary-dark rounded-lg p-2 md:p-4 lg:p-8">
                              <Heading title="Trade Order History" hScreen={false} />
                              <table className="table-auto ">
                                    <thead className=" text-th-primary-light border-b-2 border-th-primary-light ">
                                          <tr className="">
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">games played</th>
                                                <th className="text-center p-5  border-l-2 border-r-2 border-th-primary-light">choice</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">result</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">win?</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">old eth</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">new eth</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">date</th>
                                                <th className="text-center p-5 border-l-2 border-r-2 border-th-primary-light">
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

                                                </th>

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
      )
}