const dataUrl = 'wn_synset_nouns_hyponyms_network.js'; // Path to your JSON file
const mydata = JSON.parse(data);

const allLinks = mydata.links.map(d => ({...d}));
const allNodes = mydata.nodes.map(d => ({...d}));

// Specify the color scale.
const colors = ['#7b324e','#a14166','#c7507e','#933b5d', '#b74671'];

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

// Add a group to hold all graph elements so they can be transformed by zooming and dragging
const graphGroup = svg.append('g');

// Zoom functionality
const zoom = d3.zoom()
  .scaleExtent([0.1, 5]) // Set zoom scale limits
  .on('zoom', function(event) {
    graphGroup.attr('transform', event.transform); // Apply zoom transformation
  });

svg.call(zoom); // Apply zoom behavior to the SVG

// Drag functionality
const drag = d3.drag()
  .on('start', function(event) {
    // Prevent any zooming during the drag
    d3.select(this).style('cursor', 'move');
  })
  .on('drag', function(event) {
    // Update the position of the graphGroup during the drag
    graphGroup.attr('transform', `translate(${event.x}, ${event.y})`);
  })
  .on('end', function(event) {
    // Restore cursor after drag ends
    d3.select(this).style('cursor', 'default');
  });

svg.call(drag); // Apply drag behavior to the SVG

let targetNodeId = "02086723"; // Initially focused node



// Function to refresh the graph based on the current targetNodeId
async function updateGraph() {
  const mydata = JSON.parse(data);
  
  const allLinks = mydata.links.map(d => ({...d}));
  const allNodes = mydata.nodes.map(d => ({...d}));
  
  console.log(typeof targetNodeId); 
  console.log('New targetNodeId:', targetNodeId);
  
  console.log('All nodes:', allNodes);
  console.log('All links:', allLinks);

  let nodes = [];
  let links = [];

  // exit render
  graphGroup.selectAll('text').data(nodes).exit().remove();
  graphGroup.selectAll('circle').data(nodes).exit().remove();
  graphGroup.selectAll('line').data(links).exit().remove();

  // Filter links to only include those connected to the target node
  links = allLinks.filter(link => link.source === targetNodeId || link.target === targetNodeId);
  // Extract the IDs of nodes directly connected to the target node
  let connectedNodeIds = new Set(links.flatMap(link => [link.source, link.target]));
  // Filter nodes to only include the target node and its connected nodes
  nodes = allNodes.filter(node => connectedNodeIds.has(node.id));

  console.log('Filtered Nodes:', nodes);
  console.log('Filtered Links:', links);

  const nodeDegrees = {};
  links.forEach(link => {
    nodeDegrees[link.source] = (nodeDegrees[link.source] || 0) + 1;
    nodeDegrees[link.target] = nodeDegrees[link.target] || 0; // Ensure targets are initialized
  });

  // enter render
  const lines = graphGroup.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', link => link.source === targetNodeId ? '#B86800' : '#454372')
    .attr('stroke-width', 5);

  const circles = graphGroup.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('fill', node => {
      if (node.id === targetNodeId) {
        return '#ffbc42'; // Central node size
      }
      return nodeDegrees[node.id] > 0 ? colors[Math.round(Math.random() * 4 + 0.49)] : '#7EB0D2'; // Larger for sources, smaller otherwise
    })
    .attr('r', node => {
      if (node.id === targetNodeId) {
        return 90; // Central node size
      }
      return nodeDegrees[node.id] > 0 ? 60 : 120; // Larger for sources, smaller otherwise
    })
    .on('click', function (event, d) { // Use 'event' for the click event and 'd' for the node data
      targetNodeId = d.id; // Update targetNodeId with the correct node ID
      updateGraph(); // Refresh graph
    });

  circles.append("title")
    .text(d => d.definition);

  const text = graphGroup.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
	.attr("font-family", "Consolas")
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('width', 60)
    .text(node => node.members.replace(/_/g, ' ').replace(/,/g, ', '));

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).distance(200).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-10000))
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.on('tick', () => {
    circles
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    text
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .call(wrapText, 100);
    lines
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  });

  // Function to wrap text within an SVG <text> element
  function wrapText(textSelection, width) {
    textSelection.each(function () {
      const text = d3.select(this); // Current <text> element
      const words = text.text().replace(/_/g, '#').replace(/,/g, ',#').split(/\#/).reverse(); // Split text into words
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1; // Line height as a multiple of font size
      const y = text.attr("y") - 20;
      const x = text.attr("x") || 0; // Default x if not set
      const dy = parseFloat(text.attr("dy")) || 0; // Default dy if not set
      let tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", `${dy}em`);

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop(); // Remove the last word that caused overflow
          tspan.text(line.join(" "));
          line = [word]; // Start a new line
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", `${++lineNumber * lineHeight}em`)
            .text(word);
        }
      }
    });
  }
}

updateGraph();
