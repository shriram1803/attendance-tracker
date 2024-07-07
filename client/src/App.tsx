import React from 'react';
import { DataContextProvider } from './contexts/dataContext';
import AppRoutes from './routes/Routes';

const App = () => {
  // console.log(process.env.BACKEND_URL)

  
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
