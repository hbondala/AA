import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from  '@observablehq/runtime';
//import notebook from "https://api.observablehq.com/@ujwalamusku/parallel-sets.tgz?v=3"
import notebook from '../../src/d3/parallel-sets/1119cd90df42354c@485';


function ParallelSets() {
    const chartRef = useRef();

    // const library=new Library();

    // const text =FileAttachment("./files/parallelsets").text();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "chart") return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);


  return (
    <>
      <div ref={chartRef} />
      {/* <p>Credit: <a href="https://observablehq.com/@ujwalamusku/parallel-sets">Parallel Sets by Ujwala Musku</a></p> */}
    </>
  );

  // return (
  //   <>
  //     <div>
  //     <iframe width="100%" height="660" frameborder="0"
  // src="https://observablehq.com/embed/37b8d43368c08729?cells=chart"></iframe>
  //     </div>
  //   </>
  // );
}

export default ParallelSets;