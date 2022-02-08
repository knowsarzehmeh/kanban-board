import React from 'react';
import { SearchIcon } from './assets';

function Search() {
  return (
      <div className='flex p-2 border items-center w-50 md:w-80 rounded-lg '>
          <SearchIcon className='w-5 h-5' />
          <input className='ml-3 flex-1 outline-none text-sm' type='text' placeholder='Search a thing...' />
      </div>
  )
}

export default Search;
