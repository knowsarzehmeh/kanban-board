import React from 'react';
import { PlusSmIcon } from './assets';
import Ticket from './Ticket';

function Board() {
  return (
      <section className='flex gap-5 px-4 p-8 md:px-8 overflow-x-auto'>
         <div className='overflow-y-hidden  flex-shrink-0'>
            <div className='flex justify-between items-center mb-3'>
                    <div className='flex items-center space-x-3'>
                    <h4 className=' text-gray-600 text-sm  font-bold'>BACKLOG</h4>
                    <span className='text-gray-400 text-sm'> 5</span>
                    </div>

                    <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                            <PlusSmIcon className='w-4 h-4' />
                    </button>
                </div>
            <section className='max-h-128 w-64 overflow-y-auto flex-column'>
               <Ticket />
               <Ticket />
               <Ticket />
               <Ticket />
               <Ticket />
           </section>
           </div>

           <div className='overflow-y-hidden  flex-shrink-0'>
           <div className='flex justify-between items-center mb-3'>
                    <div className='flex items-center space-x-3'>
                    <h4 className=' text-gray-600 text-sm  font-bold'>TODO</h4>
                    <span className='text-gray-400 text-sm'> 5</span>
                    </div>

                    <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                            <PlusSmIcon className='w-4 h-4' />
                    </button>
                </div>
            <section className='max-h-128 w-64 overflow-y-auto flex-column'>
               <Ticket />
               <Ticket />
           </section>
           </div>
           <div className='overflow-y-hidden  flex-shrink-0'>
            <div className='flex justify-between items-center mb-3'>
                    <div className='flex items-center space-x-3'>
                    <h4 className=' text-gray-600 text-sm  font-bold'>IN PROGRESS</h4>
                    <span className='text-gray-400 text-sm'> 5</span>
                    </div>

                    <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                            <PlusSmIcon className='w-4 h-4' />
                    </button>
                </div>
            <section className='max-h-128 w-64 overflow-y-auto flex-column'>
               <Ticket />
           </section>
           </div>
           <div className='overflow-y-hidden  flex-shrink-0'>
            <div className='flex justify-between items-center mb-3'>
                        <div className='flex items-center space-x-3'>
                        <h4 className=' text-gray-600 text-sm  font-bold'>DONE</h4>
                        <span className='text-gray-400 text-sm'> 5</span>
                        </div>

                        <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                                <PlusSmIcon className='w-4 h-4' />
                        </button>
                </div>
            <section className='max-h-128 w-64 overflow-y-auto flex-column'>
            <Ticket />
            <Ticket />
            <Ticket />
            </section>
           </div>
           <div className='overflow-y-hidden  flex-shrink-0'>
            <div className='flex justify-between items-center mb-3'>
                        <div className='flex items-center space-x-3'>
                        <h4 className=' text-gray-600 text-sm  font-bold'>DONE</h4>
                        <span className='text-gray-400 text-sm'> 5</span>
                        </div>

                        <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                                <PlusSmIcon className='w-4 h-4' />
                        </button>
                </div>
            <section className='max-h-128 w-64 overflow-y-auto flex-column'>
                <Ticket />
                <Ticket />
                <Ticket />
            </section>
          </div>
      </section>
  )
}

export default Board;
