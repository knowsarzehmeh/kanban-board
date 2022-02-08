import React, { useEffect } from 'react';
import BoardCard from '../components/BoardCard';
import Layout from '../components/Layout';
import { FETCH_BOARD } from '../constants';
import { useBoardContext } from '../context/boardContext';

function BoardListPage() {

   const {state , dispatch}  =  useBoardContext()


    const fetchBoardsFromServer = async () => {
        let res = await fetch('http://localhost:8000/boards', {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })

         res = await res.json()
        if(Array.isArray(res) && res.length > 0) {
             dispatch({ type: FETCH_BOARD, boards: res })
        }
    }
    

    useEffect(() => {
        fetchBoardsFromServer()
    }, [])

  return(
      <Layout>
          <div className='flex px-4 p-8 gap-4 md:px-8 flex-wrap'>
              {
                state.boards.map(board => {
                    return (
                        <BoardCard key={board.id} board={board} />
                    )
                })
              }
          </div>
      </Layout>
  )
}

export default BoardListPage;
