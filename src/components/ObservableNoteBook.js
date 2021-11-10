import React, {useRef, useEffect} from "react"; 
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@ujwalamusku/sankey-diagram-artists";


function ObservableNoteBook() {
    const ref = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "chart") {
        return new Inspector(ref.current);
      }
    });
    return () => runtime.dispose();
  }, []);

  return (
    <div className="BarChart">
      <div ref={ref}></div>
      <p>Credit: <a href="https://observablehq.com/@ujwalamusku/sankey-diagram-artists">Mike Bostock</a></p>
    </div>
  );
}
  
export default ObservableNoteBook
