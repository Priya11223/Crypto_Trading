import React from 'react'

const page = () => {
  const call = () =>{
    console.log("Hello");
  }
  return (
    <div>
      This is the new controller
      {
        <p>Here it is</p>
      }
      {
        <p>Hello there </p>
      }
    </div>
  )
}

export default page