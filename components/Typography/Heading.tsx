

import React from 'react'
import { Childs } from '../../interfaces/childs'

interface Props {
      title: string
}

export default function ScreenHeading({ title}: Props): JSX.Element {

      return (
            <>
                  <div className="flex flex-col items-center justify-center">
                        <h1 className="text-center text-xl sm:text-2xl lg:text-6xl text-th-primary-light  text-shadow-md subpixel-antialiased mb-8 md:mb-14 lg:mb-20">
                              {title}
                        </h1>
                  </div>
            </>
      );
}
