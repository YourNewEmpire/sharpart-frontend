import React from 'react'
import { ModalCardProps } from '../../interfaces/modalcard'
import { useSelector } from 'react-redux'

export default function ModalCard({ action1, action2, body }: ModalCardProps): JSX.Element {

      const state = useSelector((state) => state)

      return (
            <div className=" 
            flex flex-col items-center justify-center 
            rounded-lg shadow-lg
            bg-blue-200

            ">
                  <div className="flex-1">
                        <p className=" text-gray-900 py-10">
                              {body}
                        </p>
                  </div>
                  <div className=" grid grid-cols-2 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1  justify-items-stretch w-full px-4">
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