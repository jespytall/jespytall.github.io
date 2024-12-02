---
layout: blank
title: "Sino-Tibetan Tree"
permalink: /cel3/panel1/sino-tibetan_tree
---

<script src="https://unpkg.com/d3@5.6.0/dist/d3.min.js"></script>

<style>
	body {
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  margin: 0;
	  overflow: hidden;
	}

	path {
	  fill: none;
	  stroke: #7c334f;
	}

	text {
	  text-shadow:
	   -1px -1px 3px white,
	   -1px  1px 3px white,
		1px -1px 3px white,
		1px  1px 3px white;
	  pointer-events: none;
	  font-family: 'Playfair Display', serif;
	}

	div.tooltip {
	  position: absolute;	
	  text-align: center;	
	  width: 60px;	
	  height: 28px;		
	  padding: 2px;	
	  font: 12px sans-serif;	
	  background: lightsteelblue;	
	  border: 0px;					
	  border-radius: 8px;
	}

</style>

<svg></svg>

<script src="/cel3/sino-tibetan_tree.js"></script>
