import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core';
import './App.css'
import { Routes } from 'react-router-dom';

function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }))
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header/>
    <Routes>
    <Route path='/' element={<Home />}  exact/>
    <Route path='/coin/:id' element={<CoinPage />} />

    </Routes>
    
    
    </div>
  );
}

export default App;



