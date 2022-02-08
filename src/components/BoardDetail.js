import React, {useEffect} from 'react';
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
  

  return (
    <Layout>
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
    
                        <button className='border rounded-full flex bg-gray-200  p-1 items-center justify-center'>
                                <PlusSmIcon className='w-4 h-4' />
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
