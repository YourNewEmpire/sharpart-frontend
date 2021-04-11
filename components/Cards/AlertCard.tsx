import React from 'react'
import { AlertCardProps } from '../../interfaces/cards'

export default function AlertCard({ title, body, color }: AlertCardProps): JSX.Element {


      if (title && body && color === 'amber') return (
            <div
            className="
            bg-amber-100 text-amber-700
            border-2 md:border-8 border-amber-500
            px-4 py-3 rounded relative" role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body && color === 'red') return (
            <div
            className="
            bg-red-100 text-red-700
            border-2 md:border-8 border-red-500 
            px-4 py-3 rounded relative" role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body &&color === 'blue') return (
            <div
            className="
            bg-blue-100 
            border-2 md:border-8 border-blue-500 text-blue-700
            px-4 py-3 rounded relative" role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body && color === 'green') return (
            <div
            className="
            bg-green-100 
            border-2 md:border-8  border-green-500 text-green-700
            px-4 py-3 rounded relative" role="alert"
            >
                  <h1 className=" text-center font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )

      else return <div className="display-none"></div>
}