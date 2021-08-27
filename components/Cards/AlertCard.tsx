import React from 'react'
import { AlertCardProps } from '../../interfaces/cards'

export default function AlertCard({ title, body, success, failure, info, warning }: AlertCardProps): JSX.Element {


      if (title && body && warning) return (
            <div
                  className="
            bg-th-accent-warning-light text-th-accent-warning-dark
            border-2 md:border-8 border-th-accent-warning-medium px-4 py-4 rounded relative"
             role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body && failure) return (
            <div
                  className="
            bg-th-accent-failure-light text-th-accent-failure-dark border-th-accent-failure-medium 
            border-2 md:border-8 px-4 py-3 rounded relative
            " role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body && info) return (
            <div
                  className="
            bg-th-accent-info-light border-th-accent-info-medium text-th-accent-info-dark
            border-2 md:border-8 px-4 py-3 rounded relative"
             role="alert"
            >
                  <h1 className="font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )
      else if (title && body && success) return (
            <div
                  className="
            bg-th-accent-success-light border-th-accent-success-medium text-th-accent-success-dark
            border-2 md:border-8  px-4 py-3 rounded relative" 
            role="alert"
            >
                  <h1 className=" font-bold text-sm md:text-3xl mb-4">{title}</h1>
                  <span className="block sm:inline">{body}</span>
            </div>
      )

      else return <div className="display-none"></div>
}