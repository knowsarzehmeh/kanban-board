import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import BoardDetail from '../pages/BoardDetail';
import BoardListPage from '../pages/BoardListPage';
import TicketDetail from '../pages/TicketDetail';

function AppRouter() {
  return (
      <BrowserRouter>
         <Routes>
             <Route path='/' element={ <BoardListPage />} />
             <Route path='/board/:id' element={<BoardDetail />} />
             <Route path='/board/:id/ticket/:ticketId' element={<TicketDetail/>} />
         </Routes>
      </BrowserRouter>
  )
}

export default AppRouter;
