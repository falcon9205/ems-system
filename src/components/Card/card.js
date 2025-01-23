import React from 'react'
import "./card.css"
import Link from 'next/link'
const card = (data) => {
  return (
    <>
<div className="card">
  <h1 className='font-bold text-4xl text-white capitalize text-center'>Just For you ?</h1>
  <div className="card__content">
    <p className="card__title">{data.title1}
    </p><p className="card__description font-bold">{data.description1}</p>
    <Link href={data.link} target='_blank'><button className='bg-black rounded-lg px-2 my-2 text-white'>Get it</button></Link>
  </div >
</div>

    </>
  )
}

export default card
