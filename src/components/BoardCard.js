import React from 'react';
import {Link} from 'react-router-dom'

function BoardCard({
    board
}) {
    const { id, title } = board
  return (
    <Link to={`board/${id}`} className=' flex-shrink-0  p-5 w-64 flex items-center justify-center bg-white border rounded-md shadow h-20 max-h-full mb-2'> 
                <h3 className='text-md font-semibold mb-2'>{title}</h3>
      </Link>
  )
}

export default BoardCard;
