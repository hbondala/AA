// https://observablehq.com/@ujwalamusku/parallel-sets@485
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["artists_new_cat.csv","./files/parallelsets"]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Parallel Sets

[Parallel sets](https://kosara.net/publications/Bendix_InfoVis_2005.html) are like [parallel coordinates](/@d3/parallel-coordinates), but for categorical dimensions. The thickness of each curved line represents a quantity that is repeatedly subdivided by category. This example looks at the *Titanic* disaster of 1912.

Data: [Robert J. MacG. Dawson](http://jse.amstat.org/v3n3/datasets.dawson.html)`
)});
  main.variable(observer("viewof category_val")).define("viewof category_val", ["html","URLSearchParams"], function(html,URLSearchParams){return(
Object.assign(html`<select>
  <option value=Education>Education
  <option value=Occupation>Occupation
</select>`, {
  value: new URLSearchParams(html`<a href>`.search).get("Category") || "Education"
})
)});
  main.variable(observer("category_val")).define("category_val", ["Generators", "viewof category_val"], (G, _) => G.input(_));
  main.variable(observer()).define(["category_val"], function(category_val){return(
typeof category_val
)});
  main.variable(observer()).define(["category_val"], function(category_val){return(
category_val
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","sankey","graph","color"], function(d3,width,height,sankey,graph,color)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const {nodes, links} = sankey({
    nodes: graph.nodes.map(d => Object.assign({}, d)),
    links: graph.links.map(d => Object.assign({}, d))
  });

  svg.append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
    .append("title")
      .text(d => `${d.name}\n${d.value.toLocaleString()}`);

  svg.append("g")
      .attr("fill", "none")
    .selectAll("g")
    .data(links)
    .join("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", d => color(d.names[0]))
      .attr("stroke-width", d => d.width)
      .style("mix-blend-mode", "multiply")
    .append("title")
      .text(d => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`);

  svg.append("g")
      .style("font", "10px sans-serif")
    .selectAll("text")
    .data(nodes)
    .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .text(d => d.name)
    .append("tspan")
      .attr("fill-opacity", 0.7)
      .text(d => ` ${d.value.toLocaleString()}`);

  return svg.node();
}
);
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("height")).define("height", function(){return(
720
)});
  main.variable(observer("sankey")).define("sankey", ["d3","width","height"], function(d3,width,height){return(
d3.sankey()
    .nodeSort(null)
    .linkSort(null)
    .nodeWidth(4)
    .nodePadding(20)
    .extent([[0, 5], [width, height - 5]])
)});
  main.variable(observer("graph")).define("graph", ["keys","data"], function(keys,data)
{
  let index = -1;
  const nodes = [];
  const nodeByKey = new Map();
  const indexByKey = new Map();
  const links = [];

  for (const k of keys) {
    for (const d of data) {
      const key = JSON.stringify([k, d[k]]);
      if (nodeByKey.has(key)) continue;
      const node = {name: d[k]};
      nodes.push(node);
      nodeByKey.set(key, node);
      indexByKey.set(key, ++index);
    }
  }

  for (let i = 1; i < keys.length; ++i) {
    const a = keys[i - 1];
    const b = keys[i];
    const prefix = keys.slice(0, i + 1);
    const linkByKey = new Map();
    for (const d of data) {
      const names = prefix.map(k => d[k]);
      const key = JSON.stringify(names);
      const value = d.value || 1;
      let link = linkByKey.get(key);
      if (link) { link.value += value; continue; }
      link = {
        source: indexByKey.get(JSON.stringify([a, d[a]])),
        target: indexByKey.get(JSON.stringify([b, d[b]])),
        names,
        value
      };
      links.push(link);
      linkByKey.set(key, link);
    }
  }

  return {nodes, links};
}
);
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleOrdinal(["Perished"], ["#da4f81"]).unknown("#ccc")
)});
  main.variable(observer("data1")).define("data1", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("artists_new_cat.csv").text(),
           function (d){ 
       //d.filter(function(row) {return row.category == 'Education'})}
    return {source: d.source, target: d.target, value: d.value, category : d.category}
})
)});
  main.variable(observer("data")).define("data", ["data1","category_val"], function(data1,category_val){return(
data1.filter(function (d) 
                        { console.log(category_val) ; if (d["category"] === category_val)
                        { return {d};
                         //{source: d.source, target: d.target, value: d.value} ;
                        }
                        })
)});
  main.variable(observer()).define(["category_val"], function(category_val){return(
console.log(category_val)
)});
  main.variable(observer()).define(["category_val"], function(category_val){return(
category_val
)});
  main.variable(observer()).define(["data"], function(data){return(
data
)});
  main.variable(observer("keys")).define("keys", ["data"], function(data){return(
Object.keys(data[0]).slice(0,-2)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-sankey@0.12")
)});
  return main;
}
