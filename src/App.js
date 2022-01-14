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
      <Barchart data={data}/>
      <Sankey data={sankeydata} edit={editSanMode} style="padding-left: 50px"/>
      <Footer/>
      <Switch>
        <Route path="/" exact/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
