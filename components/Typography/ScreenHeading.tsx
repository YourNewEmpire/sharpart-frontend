import React from 'react'
import { Childs } from '../../interfaces/childs'

interface Props extends Childs {
  title: string
}

export default function ScreenHeading({ title, children }: Props): JSX.Element {

  return (
    <>
      <div className="flex flex-col items-center justify-center  h-screen ">
        <h1 className="text-center text-xl sm:text-2xl lg:text-6xl text-th-primary-medium text-shadow-md subpixel-antialiased mb-8 md:mb-14 lg:mb-20">
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}
