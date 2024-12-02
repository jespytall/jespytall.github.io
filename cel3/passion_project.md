---
layout: default
title: "Passion Project Update"
permalink: /cel3/panel3/passion_project
---

# Passion Project Update

My passion project for this semester is a visualization of hyponyms and hypernyms using the [Open English Wordnet](https://en-word.net/). It will be formatted like a geneology chart and show a given word's "parent(s)"(direct hypernym(s)), "siblings" (other hyponyms of the "parent"), and "children" (direct hyponyms). Users will be able to click on any visible node to make that node the center of a new dynamically generated graph. Here is a mockup of what it might look like.


![A mockup of the dynamic "family tree" graph.](/cel3/passion_project.svg "A mockup of the dynamic "family tree" graph.")


## Stretch Goal

If time allows, I would also like to create a way to find the shortest path between two words using hypernym/hyponym relationships. This function would serve no real practical function, but it would be fun to see. An example of this sort of thing is [SixDegreesofWikipedia.com](https://www.sixdegreesofwikipedia.com/)


## Data-Driven Documents

I will be using a Javascript library called Data-Driven Documents (D3) for the visualization. I have already created a tree structure for the [Sino-Tibetan Language Family](/cel3/panel1/sino-tibetan) using D3, through which I learned much of the basic and intermediate functionality of the library. I still need to learn how to dynamically update the graph, perform API calls and parse the returned JSON outputs, and find the shortest path between words efficiently.


## Resources

Data-Driven Documents (D3) Documentation and Examples:<br>
[https://d3js.org/](https://d3js.org/)

D3 Data Visualization Tutorials by Curran Kelleher on Youtube:<br>
[https://youtube.com/playlist?list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi](https://youtube.com/playlist?list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi)

Open Wordnet Documentation:<br>
[https://globalwordnet.github.io/gwadoc/](https://globalwordnet.github.io/gwadoc/)

Princeton's Wordnet:<br>
[https://wordnet.princeton.edu/](https://wordnet.princeton.edu/)

ConceptNet (It's like a wordnet, but not!):<br>
[https://conceptnet.io/](https://conceptnet.io/)


