---
layout: blank
title: "Hyponym Tree"
permalink: /project/tree
---

<script src="https://d3js.org/d3.v7.min.js"></script>

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

	text {
	  text-shadow:
	   -1px -1px 3px white,
	   -1px  1px 3px white,
		1px -1px 3px white,
		1px  1px 3px white;
	  pointer-events: none;
	  font-family: 'Open Sans', serif;
	  font-weight: bold;
	  font-size: 1.75em;
	}

</style>

<svg></svg>

<script src="/project/wn_synset_nouns_hyponyms_network.js"></script>
<script type="module" src="/project/tree.js"></script>

