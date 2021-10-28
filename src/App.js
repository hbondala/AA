import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SlideShow from './components/SlideShow';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Footer/>
      <Switch>
        <Route path="/" exact/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
