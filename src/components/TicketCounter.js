import React from 'react';

function TicketCounter({value = 30 }) {
  return ( 
  <div className='p-2 rounded-2xl bg-red-500 w-8 h-5 flex items-center justify-center absolute top-1/3 right-0'>
        <p className='text-white text-xs'>{value}</p>
  </div>)

}

export default TicketCounter;
