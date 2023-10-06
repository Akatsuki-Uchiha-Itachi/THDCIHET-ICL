import Login from './components/Login';
import Admin from './components/Admin';
import Home from './components/Home';
import { UserProvider } from './components/UserContext';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import BuyerLogin from './components/BuyerLogin';



function App() {
  return (
    <>
      {<Router>
        <UserProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/manager' element={<BuyerLogin/>}/>
          <Route exact path='/admin' element={<Admin/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
        </UserProvider>
      </Router>}
    </>
  );
}

export default App;
