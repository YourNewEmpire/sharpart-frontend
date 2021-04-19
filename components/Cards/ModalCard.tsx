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
                  <div className="flex-1 py-8 px-6">
                        <p className=" text-3xl text-th-primary-light text-center text-shadow-md">
                              {body}
                        </p>
                  </div>
                  <div className=" grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2  justify-items-center w-full px-4">
                        <div className="py-2 mx-6" >
                              {action1}
                        </div>
                        <div className="py-2 mx-6"  >
                              {action2}
                        </div>
                  </div>

            </div>
      )
}