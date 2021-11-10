import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SlideShow from './components/SlideShow';
import Footer from './components/Footer';
//import Artedu from './components/SankeyDiagramArtists';
import ParallelSets from './components/ParallelSets';
//import ObservableNoteBook from './components/ObservableNoteBook';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <ParallelSets/>
      <Footer/>
      <Switch>
        <Route path="/" exact/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
