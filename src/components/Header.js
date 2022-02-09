import React, { useState } from 'react';
import { BASE_URL, CREATE_BOARD } from '../constants';
import { useBoardContext } from '../context/boardContext';
import { CogIcon, InformationCircleIcon, MenuIcon, PlusSmIcon, UserAddIcon } from './assets';
import Avatar from './Avatar';
import Search from './Search';
import UserSettings from './UserSettings';



function Header() {

    const [loadForm, setLoadForm] = useState(false)
    const [boardTitle, setBoardTitle] = useState('')
    const [isCreating, setIsCreating] = useState(false)

    const {state, dispatch} = useBoardContext()


function renderForm() {  

    const defaultCardList = [
        { 
            title: 'Backlog',
        },
        {
            title: 'Todo',
        },
        {
            title: 'In-progress'
        },
        {
            title: 'Done'
        }
    ]

 const createBoard = async (e) => {
     e.preventDefault();
     if(boardTitle.length > 0) {
         setIsCreating(true)
     const res = await fetch(`${BASE_URL}/boards`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({ title: boardTitle})
        })

     const result = await res.json()

        // console.log(result)
        if(result.id) {

            // assign default cardlist to board
          const mapBoardToCard = defaultCardList.map((list) => ({ title: list.title, boardId: result.id }))

        //   create on the server
        mapBoardToCard.forEach( async (card) => {
            // console.log('before assign', card)
            const res = await fetch(`${BASE_URL}/lists`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(card)
            })
            await res.json()

        })

        setBoardTitle('')
        dispatch({ type: CREATE_BOARD, board: result })
        setTimeout(() => {
            setIsCreating(false)
        }, 500); 
        
        }
     }
 }

return (
<div id="authentication-modal"   className={`flex  bg-black bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0  ${!loadForm ? 'hidden' : ''}` } >
    <div className="relative px-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
                <button onClick={() => setLoadForm(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
            </div>
            <form onSubmit={(e) => createBoard(e)} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a new board</h3>
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input onChange={(e) => setBoardTitle(e.target.value) } value={boardTitle} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter a title for this board" required />
                </div>
              
                <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">{!isCreating ? 'Create board' : 'Loading...'}</button>
            </form>
        </div>
    </div>
</div> 
        );
    }


  return (
      <header className='w-full  m-h-52 py-5 px-4 md:px-8 bg-white border-b shadow-sm'>
          <div className='flex items-center '>
              <button className='lg:hidden'>
                  <MenuIcon className='w-5 mr-2' />
              </button>
            <div className='flex items-center justify-between flex-1'>
              <Search />
              <UserSettings />
            </div>
          </div>
          
          <div className='mt-6'>
              <p className='text-sm text-gray-600'>{state.board && state.board.title ? 'Checkout Experience Team' : ''}</p>
              <div className='flex justify-between'>
                  <p className='text-2xl'>{state.board ? state.board.title : ''}</p>
                  <div className='flex items-center'>
                  
                      <Avatar src='https://randomuser.me/api/portraits/men/65.jpg' containerClass='-mr-2'/>
                     
                      <Avatar src='https://randomuser.me/api/portraits/men/45.jpg' containerClass='-mr-2' />
                     
                      <Avatar src='https://randomuser.me/api/portraits/men/85.jpg' containerClass='-mr-2'/>
                     
                      <Avatar src='https://randomuser.me/api/portraits/men/35.jpg' containerClass='-mr-2'/>
                     
                      <span className='w-8 h-8 border rounded-full flex items-center justify-center z-40 bg-white'>
                             <p className='text-sm'>3+</p>
                      </span>
                  </div>
              </div>
          </div>

          {/*  */}
          <nav className='flex md:justify-between flex-col md:flex-row lg:items-center mt-5'>
              <ul className='order-2 md:order-1 flex items-center mt-3 md:mt-0'>
                  <li>
                    <button className='px-3 py-2 rounded-lg text-red-700 bg-red-100 hover:bg-red-400  hover:text-white'>
                        Boards
                    </button>
                  </li>
                  <li>
                    <button className='px-3 py-2 text-gray-500'>
                        Timeline
                    </button>
                  </li>
                  <li>
                    <button className='px-3 py-2 text-gray-500'>
                        Table
                    </button>
                  </li>
                  <li>
                    <button className='px-3 py-2 text-gray-500'>
                        Reports
                    </button>
                  </li>
                  <li>
                    <button className='px-3 py-2 text-gray-500'>
                        Files
                    </button>
                  </li>
              </ul>


              <ul className='order-1 md:order-2 flex items-center'>
                  <li className='w-10 h-9 border  rounded-md mr-2'>
                     <button className='flex p-2 items-center w-full h-full justify-center'> 
                            <UserAddIcon className='w-8 h-8' />
                     </button> 
                  </li>
                  <li className='w-10 h-9 border  rounded-md mr-2'>
                     <button className='flex p-2 items-center w-full h-full justify-center'> 
                            <CogIcon className='w-8 h-8' />
                     </button> 
                  </li>
                  <li className='w-10 h-9 border  rounded-md mr-2'>
                     <button className='flex p-2 items-center w-full h-full justify-center'> 
                            <InformationCircleIcon className='w-8 h-8' />
                     </button> 
                  </li>
                  <li className='flex-1'>
                      <button onClick={() => setLoadForm(true)} className='bg-red-600 text-white text-sm px-3 p-2 rounded-md flex items-center'>
                         <PlusSmIcon className='w-4 h-4'/> 
                         <span> New Board</span>
                      </button>
                  </li>
              </ul>
            { renderForm()}
          </nav>
      </header>
  )
}

export default Header;
