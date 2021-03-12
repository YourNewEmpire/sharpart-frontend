
import React, { ReactChild, ReactChildren } from 'react'
import styled from 'styled-components'
import "tailwindcss/tailwind.css";
import Nav from './Nav'


interface Props {
      children: ReactChild[] | ReactChildren[] | ReactChild | ReactChildren;
}

export default function Layout({ children }: Props): JSX.Element {
      return (
            <>
                  <Nav />
                  <div className="container mx-auto darkblue" >

                        {children}
                  </div >

            </>

      )
}