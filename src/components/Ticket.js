import React from 'react';
import { ChatAltIcon, DotsHorizontalIcon } from './assets';
import Avatar from './Avatar';

function Ticket({
   labelColorClass = 'bg-pink-500 ',
    label = 'Research',
    title = 'Auditing information architecture',
    description = 'Listing out all of the findings from the current to the existing IA'
}) {
  return(
    <article className='shadow rounded-md border p-3 mb-3'>
    <div className='flex justify-between items-center'>
         <span className={'text-xs py-1 px-3 text-white rounded-xl ' + labelColorClass} >
                {label}
         </span>
         <button className='w-5'>
             <DotsHorizontalIcon className='w-5 text-gray-400' />
         </button>
    </div>
    <div id='content' className='mt-3'>
         <h3 className='text-sm mb-2'>{title}</h3>
         <p className='text-xs text-gray-400'>
             {description}
         </p>
    </div>
    <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center'>
              <Avatar  src='https://randomuser.me/api/portraits/men/30.jpg' />
              <Avatar src='https://randomuser.me/api/portraits/men/25.jpg' containerClass='-ml-2' />
          </div>

          <div className='flex items-center space-x-1'>
               <ChatAltIcon  className='w-4 text-gray-400 ' />
              <span className='text-sm text-gray-400'>23</span>
          </div>
    </div>
</article>
  )
}

export default Ticket;
