import React from 'react';
import Header from './Header';


function Content({children}) {
  return (
    <main className='lg:ml-60 flex-1 min-w-0 bg-gray-50'> 
      <Header />
      {/* <Board /> */}
      {children}
  </main>
  )
}

export default Content;
