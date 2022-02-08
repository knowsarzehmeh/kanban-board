import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import BoardDetail from '../components/BoardDetail';
import BoardListPage from '../pages/BoardListPage';

function AppRouter() {
  return (
      <BrowserRouter>
         <Routes>
             <Route path='/' element={ <BoardListPage />} />
             <Route path='/board/:id' element={<BoardDetail />} />
         </Routes>
      </BrowserRouter>
  )
}

export default AppRouter;
