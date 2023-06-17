import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './view/components/Navbar';

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
