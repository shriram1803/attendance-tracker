import { Router } from 'react-router-dom';
import RouterMain from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <RouterMain />
      <ToastContainer />
    </>
  );
}

export default App;
