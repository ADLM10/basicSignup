import { useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import UserTable from './components/UserTable';
import { ToastContainer } from 'react-toastify';

function App() {

  const users = [{ firstName:"Alimpan",lastName:"De", phone: 1234567890 }, { firstName:"Rohan",lastName:"Singh", phone:987654321 }];

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
