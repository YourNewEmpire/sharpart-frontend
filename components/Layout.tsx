import React, { ReactChild, ReactChildren } from 'react'
import "tailwindcss/tailwind.css";
import Nav from './Nav'


interface Props {
      children: ReactChild[] | ReactChildren[] | ReactChild | ReactChildren;
}

export default function Layout({ children }: Props): JSX.Element {

      return (
            <div className="bg-lightblue-900 min-h-full">
                  <Nav />
                  <div className="container mx-auto darkblue" >

                        {children}
                  </div >

            </div>

      )
}