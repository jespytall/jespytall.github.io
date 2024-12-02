const svg = d3.select('svg');
//const width = +svg.attr('width');
//const height = +svg.attr('height');
const width = document.body.clientWidth;
const height = document.body.clientHeight;


const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const treeLayout = d3.tree().size([2400, 1200]);

const zoomG = svg
    .attr('width', width)
    .attr('height', height)
  .append('g');

const g = zoomG.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

svg.call(d3.zoom().on('zoom', () => {
  zoomG.attr('transform', d3.event.transform);
}));

d3.json('/cel3/sino-tibetan_tree.json')
  .then(data => {
    const transformData = (node) => ({
      name: node.name,
      link: node.link,
      children_count: node.children_count,
      children: [
        ...(node.languages || []).map(lang => ({
          name: lang.name,
          link: lang.link,
          country: lang.country.name
        })),
        ...(node.subgroups || []).map(transformData)
      ]
    });

    const root = d3.hierarchy(transformData(data));
    const links = treeLayout(root).links();
    const linkPathGenerator = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    // Draw links
    g.selectAll('path')
      .data(links)
      .enter().append('path')
        .attr('d', linkPathGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'black');

    // Draw nodes
    const nodes = g.selectAll('g.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('transform', d => `translate(${d.y},${d.x})`);

	// stupid shapes
    nodes.append('rect')
        .attr('width', d => (4 * d.data.name.length) + (d.data.children_count + 50 || 0))
        .attr('height', d => 4 + (Math.sqrt(d.data.children_count) || 0) * 2)
        .attr('x', d => d.children ? -((4 * d.data.name.length) + (d.data.children_count + 50 || 100)) : 0)
        .attr('y', d => -(2 + (Math.sqrt(d.data.children_count) || 0))) // Center vertically
        .attr('fill', 'transparent') // Make rectangle invisible
        .attr('cursor', 'pointer') // Change cursor on hover
        .on('click', d => {
          const url = `https://www.ethnologue.com${d.data.link || ''}`;
          window.open(url, '_blank'); // Open the link in a new tab
        })
		.append('title') // Tooltip for hover
        .text(d => {
          // Set the hover text based on the node type (subgroup or language)
          if (d.children) {
            return `${d.data.name}, a subgroup of ${d.data.children_count} languages`;
          } else {
            return `${d.data.name}, a language spoken in ${d.data.country}`;
          }
        });

    //text 
	nodes.append('text')
      .attr('dy', '0.32em')
      //.attr('x', d => d.children ? -10 : 10)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', d => {
        if (!d.children) {
          return '0.45em'; // Smaller text for leaf nodes
        }
        const childCount = d.data.children_count || 0; // Use children_count for font size
        return `${1 + childCount * 0.01}em`; // Scale font size based on children_count
      })
      .text(d => d.data.name)
		
  });
