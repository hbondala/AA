import { useD3 } from './useD3';
import React from 'react';
import * as d3 from 'd3';
import { color } from 'd3';
import './barchart.css'


function BarChart({ data }) {
  console.log(data)
  const ref = useD3(
    (svg) => {
      const height = 800;
      const width = 1200;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.state))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      
      const y1 = d3
        .scaleLinear()
        .domain([0, Math.ceil(d3.max(data, (d) => d.rate))])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);
      
      svg.append("text")
      .attr("class","axislabel")
      .attr("x",width/2)
      .attr("y",height-5)
      .style("text-anchor", "middle")
      .text("State");

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.state))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.rate))
        .attr("height", (d) => y1(0) - y1(d.rate));
    },


    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 1000,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;