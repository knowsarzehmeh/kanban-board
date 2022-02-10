import './App.css';
import { BoardProvider } from './context/boardContext';

import AppRouter from './router/AppRouter';

function App() {
  return (
    <BoardProvider>
       <AppRouter />
    </BoardProvider>
  );
}

export default App;
