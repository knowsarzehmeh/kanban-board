import React from 'react';

function Avatar({src='https://randomuser.me/api/portraits/men/75.jpg', containerClass = '', imgClass = '' }) {
  return (
    <span className={'w-8 h-8 rounded-full p-1 bg-gray-300 border border-white ' + containerClass }>
         <img src={src} className={'w-8  rounded-full ' + imgClass}  alt='' />
    </span> 
  )
}

export default Avatar;
