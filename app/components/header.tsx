import React from 'react';
import Link from 'next/link';

const Header = () => {

  // const { username } = useUsername();

  return (
    <header className="mx-auto flex items-center flex-row justify-between bg-gray-50 w-full p-4">
      <div className="w-[200px]">
        <p className='font-bold text-[24px]'>Technical Exam</p>
      </div>
      <div className="flex flex-row ">
        <Link 
        href="/" 
        className="font-bold text-[18px] hover:bg-gray-100 h-[50px] w-[100px] flex justify-center items-center rounded-lg"
        >
          Home</Link>
        <Link 
        href="/templates" 
        className="font-bold text-[18px] hover:bg-gray-100 h-[50px] w-[150px] flex justify-center items-center rounded-lg"
        >
          Current Time</Link>
        <Link 
        href="/templates/weather" 
        className="font-bold text-[18px] hover:bg-gray-100 h-[50px] w-[100px] flex justify-center items-center rounded-lg"
        >
          Weather</Link>
        <Link href="/templates/crud" className="font-bold text-[18px] hover:bg-gray-100 h-[50px] w-[100px] flex justify-center items-center rounded-lg"
        >
          Crud</Link>
      </div>
      <div className='w-[200px]'>
      <p className='font-bold text-[18px]'>Welcome, {'Guest'}!</p>
      </div>
    </header>
  );
}

export default Header;
