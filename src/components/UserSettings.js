import React from 'react';
import { BellIcon, ChevronDownIcon } from './assets';
import Avatar from './Avatar';

function UserSettings() {
  return (
      <div className='flex items-center'>
          <button className='notification mr-5'>
              <BellIcon className='w-6 h-6' />
          </button>
          <div className='flex items-center justify-evenly'>
              <Avatar src='https://randomuser.me/api/portraits/men/75.jpg' />
              <p className='mx-2 hidden md:block'>Nosazeme Obabueki</p>
              <button className='w-6'>
                 <ChevronDownIcon className='w-6 h-6' />
              </button>
          </div>
      </div>
  );
}

export default UserSettings;
