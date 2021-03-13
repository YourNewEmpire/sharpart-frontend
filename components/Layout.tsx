
import React, { ReactChild, ReactChildren } from 'react'
import styled from 'styled-components'
import "tailwindcss/tailwind.css";
import Nav from './Nav'
import { useSelector } from 'react-redux'

interface Props {
      children: ReactChild[] | ReactChildren[] | ReactChild | ReactChildren;
}

export default function Layout({ children }: Props): JSX.Element {
      const state = useSelector((state) => state)
      return (
            <div className="bg-lightblue-900 min-h-full">
                  <Nav />
                  <div className="flex justify-end display block z-40"> 
                  
                  {state.account.value}
                  </div>
                  <div className="container mx-auto darkblue" >

                        {children}
                  </div >

            </div>

      )
}