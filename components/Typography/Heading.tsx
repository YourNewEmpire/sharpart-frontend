import React from 'react'
import { Childs } from '../../interfaces/childs'

interface Props extends Childs {
  title: string
  hScreen: boolean
  fontSize?: string
}

//? Two outcomes here.
//? If there are NO children, just render a normal h1 with no margin and no subtitle('child')
//? If there are children then yes, margin-bottom on the heading and children can be a subtitle or some react node

export default function Heading({ title, hScreen, children, fontSize }: Props): JSX.Element {

  if (!children)
    return (
      <div className={`flex flex-col items-center justify-center ${hScreen ? 'h-screen' : 'h-auto'}  `}>
        <h1 className={`
        text-center ${fontSize? fontSize : 'text-xl sm:text-2xl lg:text-6xl '}
        text-th-primary-medium text-shadow-md subpixel-antialiased 
        `}>
          {title}
        </h1>
      </div>
    )

  else return (
    <>
      <div className={`flex flex-col items-center justify-center ${hScreen ? 'h-screen' : 'h-auto'}  `}>
        <h1 className={`text-center ${fontSize? fontSize : 'text-xl sm:text-2xl lg:text-6xl '}
        text-th-primary-medium text-shadow-md subpixel-antialiased mb-8 md:mb-14 lg:mb-20
        `}>
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}
