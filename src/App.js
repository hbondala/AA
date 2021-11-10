import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SlideShow from './components/SlideShow';
import Footer from './components/Footer';
//import Artedu from './components/SankeyDiagramArtists';
import ParallelSets from './components/ParallelSets';
//import ObservableNoteBook from './components/ObservableNoteBook';
import D3parse from './d3/parallel-sets/D3parse';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <D3parse/>
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
