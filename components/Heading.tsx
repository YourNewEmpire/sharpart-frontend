import React from 'react'
interface Props {
      title: string
}

export default function Heading({title}: Props): JSX.Element {

  return (
    <>
        <div className="flex items-center justify-center  h-screen ">
          <h1 className="text-xl sm:text-2xl lg:text-6xl text-th-primary-medium text-shadow-md subpixel-antialiased ">{title}</h1>
        </div>
    </>
  );
}
