'use client';
import React from 'react'
import Clock from '../components/clock';
import Header from '../components/header';

const Currenttime = () => {
  return (
      <main className='w-screen h-screen'>

        {/* header */}
        <Header />
        <div className=" flex justify-center items-center h-[650px] w-full animate-fade-up animate-once animate-duration-[1000ms] animate-ease-in">
          <div className="flex flex-col bg-white rounded-lg justify-center items-center h-[250px] w-[350px] space-y-4 shadow-lg">
            <p className=" font-extrabold text-black text-[30px]">Current Time</p>

            {/* component clock */}
            <Clock />
          </div>
        </div>
      </main>
  )
}

export default Currenttime
