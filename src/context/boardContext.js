import React, { createContext, useContext, useReducer } from 'react';
import { CREATE_BOARD, FETCH_BOARD, GET_SINGLE_BOARD } from '../constants';


const BoardContext = createContext(null);


const boardReducer = (state, action) => {
    switch(action.type){
        case FETCH_BOARD:
            return {
                ...state,
                boards: [
                    ...action.boards
                ]
            }
        case CREATE_BOARD: 
        return {
            ...state,
            boards: [
                ...state,
                action.board
            ]
        }
        case GET_SINGLE_BOARD:
            return {
                ...state,
                board: action.board
            }
        default:
            return state 
    }
}


export const BoardProvider = ({children}) => {
    const [state,dispatch ]  =   useReducer(boardReducer, { boards: [], board: {} })
    return (
        <BoardContext.Provider value={{ state, dispatch }}>
             {children}
        </BoardContext.Provider>
    )
}


export const useBoardContext = () => useContext(BoardContext)