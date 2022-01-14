import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from './components/Footer';
import Barchart from './components/BarChart'
import Sankey from './components/Sankey';
import * as d3 from 'd3';
import React from 'react';
import csvfiledata from './components/chart-data.csv'
//import {downloadS3File} from './components/FileUtil/S3Client'



function App() {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [sankeydata, setsankeyData] = useState(null);
  const [editSanMode, setSanEditMode] = useState(false);
  var bucketname="testconbucketaei"
  var key = "SSE-S3" 

  React.useEffect(() => {

    fetch("https://raw.githubusercontent.com/ozlongblack/d3/master/energy.json")
      .then(res => res.json())
      .then(sankeydata => setsankeyData(sankeydata));

    d3.csv("https://raw.githubusercontent.com/hbondala/AA/main/src/components/chart-data.csv").then((d) => {
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  //downloadS3File()

  return (
    <>
    <Router>
      <Navbar/>
      <div className='bar-chart' style={{width: 1500,padding:50}}>
        <h1 align="center"> <b><u> Bar chart</u></b></h1>
        <Barchart data={data}/>
      </div>
      
      <div className='sankey-chart' style={{width:1500,padding:50}}>
        <h1 align="center"> <b><u> Sankey chart</u></b></h1>
        <Sankey data={sankeydata} edit={editSanMode} style="padding-left: 50px"/>
      </div>

      <div className='racing-barchart' style={{width: 1500,padding:50}} >
        <h1 align="center"> <b><u> Racing Bar chart</u></b></h1>
        <iframe width="70%" height="700" frameborder="0" src="https://ujwalamusku.github.io/racingbarchart/"></iframe>
      </div>
      <div className='Grouped-barchart' style={{width: 1500,padding:50}} >
        <h1 align="center"> <b><u> Grouped Barchart</u></b></h1>
        <iframe width="70%" height="700" frameborder="0" src="https://ujwalamusku.github.io/arts/"></iframe>
      </div>
      <div className='Pie-chart' style={{width: 1500,padding:50}} >
        <h1 align="center"> <b><u> Pie chart</u></b></h1>
        <iframe width="70%" height="700" frameborder="0" src="https://himani2411.github.io/pie-chart.html"></iframe>
      </div>
      <Footer/>
      <Switch>
        <Route path="/" exact/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
