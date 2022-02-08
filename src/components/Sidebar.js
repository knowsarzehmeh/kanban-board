/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {BrandIcon} from './assets';
import TicketCounter from './TicketCounter';
import { navigation } from '../data/navigation';

function Sidebar(props) {
  return (
  <aside className='w-60 h-full border-r fixed shadow-sm bg-white overflow-y-auto hidden lg:block'>
      <div className='brand flex p-4 items-center'>
          <BrandIcon /> 
          <div className='ml-2'>
          <h3 className='2xl  font-medium'>Madewithlove</h3>
            <h3 className='text-sm text-gray-400'>Workspace</h3>
          </div>
      </div>
      <nav>
        <ul className='border-b m-3'>
            {
                navigation.map(nav => {
                    if(nav.position === 'top') {
                        return (
                    <li key={nav.id} className='p-3 text-gray-500 flex relative'>
                         <a href={nav.path} className='w-full flex items-center'>
                             <>{nav.logo} </> 
                             <p className='ml-3 flex-1'>{nav.label}</p>  
                        </a>
                        {nav.id === 1 && <TicketCounter/>}
                     </li>
                        )
                    }
                    return ''
                })
            }
       </ul>

        <ul className='m-3'>
        {
                navigation.map(nav => {
                    if(nav.position === 'bottom') {
                        return (
                    <li key={nav.id} className='p-3 text-gray-500 flex'>
                         <a href={nav.path} className='w-full flex items-center'>
                             <>{nav.logo} </> 
                             <p className='ml-3 flex-1'>{nav.label}</p>  
                        </a>
                     </li>
                        )
                    }
                    return ''
                })
            }
       </ul>
      </nav>
  </aside>
  )
}

export default Sidebar;
