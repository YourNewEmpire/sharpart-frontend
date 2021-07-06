import { useDispatch, useSelector } from 'react-redux'
import {
    setChoiceUp,
    setChoiceDown,
    selectChoice,
} from '../../../lib/slices/gameSlice';
import Submit from './Submit'

//TODO This totally needs optimising for more reusability.
//? Just being introduced.

export default function Main({ clickHandler }): JSX.Element {
    const choice = useSelector(selectChoice)
    const dispatch = useDispatch()

    return (
        <>

            <div>
                <Submit clickHandler={clickHandler} />
            </div>

            <div className='grid grid-flow-col grid-cols-2 w-full'>
                <div className='flex items-center justify-center'>
                    <button
                        onClick={() => dispatch(setChoiceUp())}
                        className={choice === true ?
                            'w-full p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-success  focus:outline-none   transition duration-300 ease-in-out'
                            : 'w-full p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'
                        }
                    >
                        Mooning
                    </button>
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        onClick={() => dispatch(setChoiceDown())}
                        className={choice === false ?
                            'w-full  p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-failure focus:outline-none transition duration-300 ease-in-out'
                            : 'w-full  p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'
                        }
                    >
                        Dropping
                    </button>
                </div>
            </div>
        </>
    )
}