import { Routes, Route } from 'react-router-dom';
import Header from "./layouts/Header";
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <div>
      <Header/>
      <div className='container pt-3'>
        <Routes>
          <Route path='employee/list' element={<Home/>}/>
          <Route path='employee/add' element={<AddEmployee/>}/>
          <Route path='employee/edit/:id' element={<EditEmployee/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
