import React, {useEffect, useState} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, GET_SINGLE_BOARD } from '../constants';
import { useBoardContext } from '../context/boardContext';
import { PlusSmIcon, ShareIcon } from '../components/assets';
import Layout from '../components/Layout';
import Ticket from '../components/Ticket';

function TicketDetail() {
  const params = useParams()
  const navigate =  useNavigate()
  const {state, dispatch}  =   useBoardContext()
  const [loadForm, setLoadForm] = useState(false)
  const [ticketTitle, setTicketTitle] = useState('')
  const [ticketDescription, setTicketDescription] = useState('')
  const [ticketLabel, setTicketLabel] = useState('Content')
  const [selectedList, setSelectedList] = useState({})
  const [showLinkUrl, setShowLinkUrl] = useState(false)
  const [ticketUrl, setTicketUrl] = useState('')

  const fetchBoardFromServer = async (id) => {
    if(isNaN(id)) navigate('/')

    try {
     let res = await fetch(`${BASE_URL}/boards/${id}?_embed=lists&_embed=tickets`,{
            method: 'GET',
        })
        res = await res.json()
        
        // console.log(res)
        let ticketDetail;
        if(res){
          ticketDetail  = res.tickets.find((ticket) => ticket.id === +params.ticketId)
            
          setTicketTitle(ticketDetail.title)
          setTicketDescription(ticketDetail.desc)
          setTicketLabel(ticketDetail.label)
        }
      
        dispatch({ type: GET_SINGLE_BOARD, board: res })
        
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    //   console.log(params);
        fetchBoardFromServer(params.id)
  }, []);


  const renderCount = (list) => {
      let filteredTicket;
      if(state.board && state.board.tickets){
        filteredTicket = state.board.tickets.filter((ticket) => ticket.listId === list.id)
      }
      return filteredTicket.length
  }


  const onSubmitTicket = async (e) => {
      e.preventDefault()
      setShowLinkUrl(true)

      const data = {
          title: ticketTitle,
          desc: ticketDescription,
          label: ticketLabel,
          boardId: +params.id,
          listId: selectedList.id
      }


      try {
   let res = await fetch(`${BASE_URL}/tickets`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(data)
    })
   res = await res.json()
   
//    console.log(res)
   let board = state.board
   board.tickets = [...board.tickets, res]

   dispatch({ type: GET_SINGLE_BOARD, board })

        setTimeout(() => {
            setShowLinkUrl(false)
        }, 500); 

      } catch(e) {
        console.error(e)
        setShowLinkUrl(false)
      }
     
  }


  const getTicketLink = () => {
      setTicketUrl(window.location.href)
  }


  useEffect(() => {
      getTicketLink()
  }, [])


  const onDragEnd = async (item) => {
      let tickets = state.board && state.board.tickets
   
    //   remove the source from the source filtered by list id
      let source = tickets.filter(ticket => ticket.listId === +item.source.droppableId )
      let draggableTicket = source.find(ticket =>  ticket.id === +item.draggableId)
      let draggableTicketIdx = tickets.findIndex(ticket =>  ticket.id === +item.draggableId)
      let destination = tickets.filter(ticket => ticket.listId === +item.destination.droppableId )

    //   update the list id of the draggableTicket
     draggableTicket = {...draggableTicket, listId: +item.destination.droppableId}
 
    //   remove from source
    tickets.splice(draggableTicketIdx, 1)

    // update postion

    tickets.splice(+item.destination.index,0, draggableTicket)


    // update on the backend
    let response = await fetch(`${BASE_URL}/tickets/${draggableTicket.id}`,{
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(draggableTicket)
    })
    await response.json()

    const updatedBoard = {...state.board, tickets }

    dispatch({type: GET_SINGLE_BOARD, board: updatedBoard })
    

  }


  const renderTicketForm = () => {
    return (
        <div id="authentication-modal"   className={`flex  bg-black bg-opacity-75 h-screen overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 ` } >
            <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 relative">
                   { showLinkUrl && <div className='absolute bottom-10 p-3 -right-80 w-80 h-30 rounded shadow bg-white z-20'>
                          <div className='flex items-center justify-between border-b mb-2 p-1'>
                            <h3 className='text-center  text-sm font-medium'>Link to this card</h3>
                            <button onClick={() => setShowLinkUrl(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                             </button>
                          </div>
                        <div className='bg-gray-100 p-2 border mt-1 rounded'>
                                <p className='text-sm'>{ticketUrl}</p>
                        </div>
                    </div>}
                    <div className="flex justify-end p-2">
                        <button onClick={() => navigate(-1) }type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                        {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Ticket </h3> */}
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                            <input onChange={(e) => setTicketTitle(e.target.value) } readOnly value={ticketTitle} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter a title for this board" required />
                        </div>

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                        <textarea onChange={(e) => setTicketDescription(e.target.value)} value={ticketDescription} readOnly id="message" style={{marginTop: '.7rem'}} rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  placeholder="Leave a comment..." required></textarea>


                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select label</label>
                        <select readOnly id="countries" onChange={(e) => setTicketLabel(e.target.value)} value={ticketLabel} style={{marginTop: '.7rem'}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
                            <option  value='Content' >Content</option>
                            <option value='Design'>Design</option>
                            <option value='Dev'>Dev</option>
                            <option value='Planning'>Planning</option>
                            <option value='Research' >Research</option>
                        </select>
                      
                        <button onClick={() => setShowLinkUrl(true)} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex items-center justify-center"> <span className='text-lg'> <ShareIcon  className='w-5 h-5 inline-block'/> Share </span> </button>
                    </form>
                </div>
            </div>
        </div> 
                );
  }
  return (
    <Layout>
        {renderTicketForm()}

    <DragDropContext onDragEnd={onDragEnd}>
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
                 
                 <Droppable droppableId={list.id.toString()}>
                        {
                            (provider) => (
                                <section ref={provider.innerRef} style={{minHeight: '20rem'}} {...provider.droppableProps} className='max-h-128 w-64 overflow-y-auto flex-column'>
                                {
                                    state.board.tickets &&
                                    state.board.tickets.filter((ticket) => ticket.listId === list.id).map((ticket,index) => {
                                
                                            return <Ticket index={index} id={ticket.id} label={ticket.label} key={ticket.id} title={ticket.title} description={ticket.desc}  />
                                  
                                    })
                                    }
                                {/* <Ticket />
                                <Ticket />
                                <Ticket />
                                <Ticket />
                                <Ticket /> */}
                                </section>
                            )
                        }
                 </Droppable>
               </div>
              ))

          }
      </section>
      </DragDropContext>
      </Layout>
  )
}

export default TicketDetail;
