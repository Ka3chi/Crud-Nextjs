'use client';
import React from 'react'
import Header from '@/app/components/header';
import { useState, useEffect } from 'react';

// data type of shoe
interface Shoe {
  id: number;
  size: number;
  color: string;
  brand: string;
}

const Crud = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [newShoe, setNewShoe] = useState({ size: 0, color: '', brand: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [error, setError] = useState('');

  //clear the input
  const handleCancel = () => {
    setNewShoe({ brand: '', size: 0, color: '' });
    setEditingId(null);
    setIsDivVisible(true); 
  };

  // fetch the data in shoes.json
  useEffect(() => {
    const fetchShoes = async () => {
      const response = await fetch('/shoes.json');
      const data: Shoe[] = await response.json();
      setShoes(data);
    };
    fetchShoes();
  }, []);

   // Adding new shoe
   const addShoe = () => {
    if (newShoe.brand.trim() === '' || newShoe.size <= 0 || newShoe.color.trim() === '') {
      setError('Fill up all the fields');
      return;
    }
    setError('');
    
    const id = shoes.length > 0 ? shoes[shoes.length - 1].id + 1 : 1;
    const shoe = { id, ...newShoe };
    setShoes([...shoes, shoe]);
    setNewShoe({ brand: '', size: 0, color: '' });
  };

   // Update an existing shoe
  const updateShoe = (id: number) => {
    if (newShoe.brand.trim() === '' || newShoe.size <= 0 || newShoe.color.trim() === '') {
      setError('Fill up all the fields');
      return false;
    }
    setError('');
    
    setShoes(shoes.map(shoe => (shoe.id === id ? { id, ...newShoe } : shoe)));
    setEditingId(null);
    setNewShoe({ brand: '', size: 0, color: '' });
    return true;
  };

  // Delete a shoe 
  const deleteShoe = (id: number) => {
    setShoes(shoes.filter(shoe => shoe.id !== id));
  };

  return (
      <main className='w-screen h-screen'>
        <Header />
        <div className='flex justify-center items-center h-[650px] w-full animate-fade-up animate-once animate-duration-[1000ms] animate-ease-in'>
          <div className='flex flex-col justify-center items-center bg-white text-black rounded-lg h-[600px] w-[900px] shadow-lg p-5'>
            <p className=" font-extrabold text-black text-[30px] mb-3">Shoe Collection</p>
            <div className=' px-0 overflow-scroll w-full h-[300px] bg-gray-100'>
              <table className='w-full text-left table-auto min-w-max space-y-5 '>

                {/* header of table */}
                <thead>
                  <tr>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                        Brand
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                        Size
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                        Color
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>

                {/* display the data in shoe.json */}
                <tbody>
                  {shoes.map(shoe => (
                    <tr key={shoe.id}>
                      {editingId === shoe.id ? (
                        <>
                          <td>
                          <input
                              type="text"
                              value={newShoe.brand}
                              onChange={e => setNewShoe({ ...newShoe, brand: e.target.value })}
                              placeholder="Brand"
                              className='border border-gray-500 w-[150px] rounded-md text-center'
                            />
                          
                          </td>
                          <td>
                          <input
                              type="number"
                              value={newShoe.size}
                              onChange={e => setNewShoe({ ...newShoe, size: parseInt(e.target.value) })}
                              placeholder="Size"
                              className='border border-gray-500 w-[150px] rounded-md text-center'
                            />
                          </td>
                          <td>  
                          <input
                              type="text"
                              value={newShoe.color}
                              onChange={e => setNewShoe({ ...newShoe, color: e.target.value })}
                              placeholder="Color"
                              className='border border-gray-500 w-[150px] rounded-md text-center'
                            />
                          </td>
                          <td className='flex flex-row justify-center items-center p-1'>
                            <button 
                              onClick={() => {
                              const success = updateShoe(shoe.id);
                              if (success) {
                                  setIsDivVisible(true);
                              }}} 
                              className="rounded-lg bg-green-500 text-black w-full h-[40px]"
                            >
                              Update
                            </button>
                            <button 
                              onClick={handleCancel} 
                              className="rounded-lg bg-black text-white w-full h-[40px] ml-3"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className='pl-5'>{shoe.brand}</td>
                          <td className='pl-5'>{shoe.size}</td>
                          <td className='pl-5'>{shoe.color}</td>
                          <td className='flex flex-row justify-center items-center p-1'>
                            <button 
                              onClick={() => {
                                setEditingId(shoe.id);
                                setNewShoe({ brand: shoe.brand, size: shoe.size, color: shoe.color });
                                setIsDivVisible(false);
                              }} 
                              className="rounded-lg bg-green-500 text-black w-full h-[40px]"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteShoe(shoe.id)} 
                              className="rounded-lg bg-red-500 text-white w-full h-[40px] ml-3"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* fetch error fields */}
            {error && <p className="text-red-500 mt-3">{error}</p>}

            {/* div for add shoe */}
            {isDivVisible && (
            <div className='flex  justify-center items-center h-[400px] w-[200px] rounded-lg bg-white'>
              <div className='flex flex-col space-y-3 '>
                <div className="w-72">
                  <div className="relative w-full min-w-[200px]">
                    <input
                      type="text"
                      value={newShoe.brand}
                      onChange={e => setNewShoe({ ...newShoe, brand: e.target.value })}
                      placeholder="Brand"
                      
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 "
                      placeholder=" " /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Brand
                    </label>
                  </div>
                </div>
                <div className="w-72">
                  <div className="relative w-full min-w-[200px]">
                    <input
                      type="text"
                      value={newShoe.size}
                      onChange={e => setNewShoe({ ...newShoe, size: e.target.value })}
                      placeholder="Size"
                      
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 "
                      placeholder=" " /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Size
                    </label>
                  </div>
                </div>
                <div className="w-72">
                  <div className="relative w-full min-w-[200px]">
                    <input
                      type="text"
                      value={newShoe.color}
                      onChange={e => setNewShoe({ ...newShoe, color: e.target.value })}
                      placeholder="Color"
                      
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 "
                      placeholder=" " /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Color
                    </label>
                  </div>
                </div>
                <button className='bg-green-400 text-white rounded-lg h-[50px]'
                onClick={addShoe}>Add Shoe</button>
              </div>
            </div>
            )}
          </div>
        </div>
    </main>
  )
}

export default Crud
