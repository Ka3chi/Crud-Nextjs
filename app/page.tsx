import Header from './components/header';
import { useState } from 'react';

export default function Home() {

  return (
    <main className='w-screen h-screen'>
      <Header />
      <div className="flex justify-center items-center h-[650px] w-full animate-fade-up animate-ease-in">
        <div className="flex justify-center items-center bg-white rounded-lg h-[250px] w-[400px] shadow-lg">
          <form 
          // onSubmit={handleSubmit} 
          className="flex flex-col justify-center items-center space-y-4">
            <p className="font-extrabold text-black text-[30px]">Please type your name</p>
            <input 
              type="text"
              // value={input}
              // onChange={(e) => setInput(e.target.value)}
              placeholder="Enter username"
              required
              className="text-black border border-gray-500 h-[30px] rounded-lg text-center"
            />
            <button 
              className="bg-gray-500 text-white h-[40px] w-[220px] rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
