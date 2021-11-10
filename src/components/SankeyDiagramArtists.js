import React, {useRef, useEffect} from "react";
//import {Runtime, Inspector} from "@observablehq/runtime";
//import notebook from "@ujwalamusku/sankey-diagram-artists";

function SankeyDiagramArtists() {
//   const ref = useRef();

//   useEffect(() => {
//     const runtime = new Runtime();
//     runtime.module(notebook, Inspector.into(ref.current));
//     return () => runtime.dispose();
//   }, []);

  return (
    <>
        <div>
        <iframe width="100%" height="500" frameborder="0"
  src="https://observablehq.com/embed/@ujwalamusku/sankey-diagram-artists?cell=*"></iframe>
        </div>
    </>
  );
}

export default SankeyDiagramArtists;