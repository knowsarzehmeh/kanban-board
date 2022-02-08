import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_SINGLE_BOARD } from '../constants';
import { useBoardContext } from '../context/boardContext';
import { PlusSmIcon } from './assets';
import Layout from './Layout';
import Ticket from './Ticket';

function BoardDetail() {
  const params = useParams()
  const navigate =  useNavigate()
  const {state, dispatch}  =   useBoardContext()
  const [loadForm, setLoadForm] = useState(false)
  const [boardTitle, setBoardTitle] = useState('')
  const [selectedList, setSelectedList] = useState({})
  const [isCreating, setIsCreating] = useState(false)

  const fetchBoardFromServer = async (id) => {
    if(isNaN(id)) navigate('/')

    try {
     let res = await fetch(`http://localhost:8000/boards/${id}?_embed=lists&_embed=tickets`,{
            method: 'GET',
        })
        res = await res.json()
        
        console.log(res)
        dispatch({ type: GET_SINGLE_BOARD, board: res })
        
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
        fetchBoardFromServer(params.id)
  }, []);


  const renderCount = (list) => {
      let filteredTicket;
      if(state.board && state.board.tickets){
        filteredTicket = state.board.tickets.filter((ticket) => ticket.listId === list.id)
      }
      return filteredTicket.length
  }


  const renderTicketForm = () => {
    return (
        <div id="authentication-modal"   className={`flex  bg-black bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0  ${!loadForm ? 'hidden' : ''}` } >
            <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                        <button onClick={() => setLoadForm(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <form onSubmit={(e) => (e)} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Ticket </h3>
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
  
console.log(selectedList)
  return (
    <Layout>
        {renderTicketForm()}
      <section className='flex gap-5 px-4 p-8 md:px-8 overflow-x-auto'>
          {
              state.board && 
              state.board.lists &&
              state.board.lists.map(list => (
                <div key={list.id} className='overflow-y-hidden  flex-shrink-0'>
                <div className='flex justify-between items-center mb-3'>
                        <div className='flex items-center space-x-3'>
                        <h4 className=' text-gray-600 text-sm  font-bold'>{list.title}</h4>
                        <span className='text-gray-400 text-sm'>{renderCount(list)}</span>
                        </div>
    
                        <button onClick={() => {
                            setSelectedList(list)
                            setLoadForm(true)
                        }} title='Add Ticket' className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                                <PlusSmIcon  className='w-4 h-4' />
                        </button>
                    </div>
                <section className='max-h-128 w-64 overflow-y-auto flex-column'>
                    {
                        state.board.tickets &&
                        state.board.tickets.map(ticket => {
                            if(ticket.listId === list.id){
                                return <Ticket key={ticket.id} title={ticket.title} description={ticket.description}  />
                            }
                            return '';
                        })
                    }
                   {/* <Ticket />
                   <Ticket />
                   <Ticket />
                   <Ticket />
                   <Ticket /> */}
               </section>
               </div>
              ))

          }
       

           {/* End all */}

           {/* <div className='overflow-y-hidden  flex-shrink-0'>
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
          </div> */}
      </section>
      </Layout>
  )
}

export default BoardDetail;
