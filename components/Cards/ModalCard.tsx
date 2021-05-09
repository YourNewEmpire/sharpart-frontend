import React from 'react'
import { ModalCardProps } from '../../interfaces/modalcard'

export default function ModalCard({ action1, action2, body }: ModalCardProps): JSX.Element {

      return (
            <div className=" 
            flex flex-col items-center justify-center 
            rounded-lg shadow-lg
            bg-th-accent-medium bg-opacity-20
            space-y-2
            md:space-y-4
            lg:space-y-8
            ">
                  <div className="inline-flex py-8 px-6">
                        <p className=" text-3xl text-th-primary-light text-center text-shadow-md">
                              {body}
                        </p>
                  </div>
                  <div className=" py-2  grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2  justify-items-center w-full px-4">
                        <div className="" >
                              {action1}
                        </div>
                        <div className=""  >
                              {action2}
                        </div>
                  </div>

            </div>
      )
}