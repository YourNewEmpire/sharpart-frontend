import React from "react";
import { useSelector, useDispatch } from 'react-redux'

const PrivatePage = () => {
  const state = useSelector((state) => state)
  const address = state.account.value


  if (!address) {
    return <div className="container "> no metamask was account detected, you need to sign in</div>
  }

  return (

    <div>
      <h1>Hello {address}</h1>
      <p>Secret things live here...</p>
    </div>
  )

};


export default PrivatePage;