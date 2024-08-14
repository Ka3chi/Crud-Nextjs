'use client';
import React from 'react'
import Link from 'next/link';
import Header from '../../components/header';
import WeatherApi from '../../components/weather';

const Weather = () => {
  return (
      <main className='w-screen h-screen'>
      {/* header */}
      <Header />
      <div className=" flex justify-center items-center h-[650px] w-full animate-fade-up animate-once animate-duration-[1000ms] animate-ease-in">
        <div className="flex flex-col bg-white rounded-lg justify-center items-center h-[400px] w-[400px] space-y-4 shadow-lg">
        <p className="font-extrabold text-black text-[30px]">Weather Search</p>
          <WeatherApi />
        </div>
      </div>
      </main>
  )
}

export default Weather
