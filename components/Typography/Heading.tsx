import React from 'react'
import { Childs } from '../../interfaces/childs'

interface Props extends Childs {
  title: string
  hScreen: boolean
}

export default function Heading({ title, hScreen, children }: Props): JSX.Element {



  if (!children)
    return (
      <div className={`flex flex-col items-center justify-center ${hScreen ? 'h-screen' : ''}  `}>
        <h1 className="text-center text-xl sm:text-2xl lg:text-6xl text-th-primary-medium text-shadow-md subpixel-antialiased mb-8 md:mb-14 lg:mb-20">
          {title}
        </h1>
      </div>
    )

  else return (
    <>
      <div className={`flex flex-col items-center justify-center ${hScreen ? 'h-screen' : 'h-auto'}  `}>
        <h1 className="text-center text-xl sm:text-2xl lg:text-6xl text-th-primary-medium text-shadow-md subpixel-antialiased mb-8 md:mb-14 lg:mb-20">
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}
