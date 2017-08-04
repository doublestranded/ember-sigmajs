# ember-sigmajs

Ember addon for [sigma.js](https://github.com/jacomyal/sigma.js)

## Installation

`ember install ember-sigmajs`

## Usage

In the template where you want your graph, you can pass in a sigma instance directly as such:

```
{{#sigma-graph sigmaInst=yourSigmaInst }}
{{/sigma-graph}}
```

or with GraphNode and GraphEdge child components (with some attribute example values):

```
{{#sigma-graph settings=mySettings rendererType=myRendererType rendererSettings=myRendererSettings}}

  {{#each myNodes as |myNode|}}
    {{graph-node id=myNode.id label=myNode.labelString x=0 y=1 size=1 color='#f00'}}
    {{/graph-node}}
  {{/each}}

  {{#each myEdges as |myEdge|}}
    {{#graph-edge id=myEdge.id source=existingNodeId target=existingNodeId size=2 type='arrow'}}
    {{/graph-edge}}
  {{/each}}

{{/sigma-graph}}
```

or with graphData specifying lists of nodes and edges (see the table below for more details):

```
{{#sigma-graph graphData=mygraphData settings=mySettings rendererType=myRendererType rendererSettings=myRendererSettings}}
{{/sigma-graph}}
```

NOTE: you can still add graph-node and graph-edge child components with graphData specified, as long as ids are not duplicated.

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Attributes

| sigma-graph attribute | sigma.js equivalent | description |
| --- | --- | --- |
| settings | settings | An object including any of [these](https://github.com/jacomyal/sigma.js/wiki/Settings#graph-settings). In addition, the included edgeLabel plugin specifies [label settings](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.edgeLabels). |
| graphData | None. Passed to the sigma instance's `graph` option on instantiation. | Format example: `{ nodes: [{id: 'n1', label: 'Hello', etc.},{id: 'n2', label: 'World', etc.}], edges: [{id: 'e0', label: 'the edge'}] }` See the two tables for graph-node and graph-edge below. |
| rendererType | None. Passed to `renderer` argument of sigma instance as `type`. | `canvas` or `webgl` if WebGL is enabled. Default is `canvas` |
| rendererSettings | None. Passed to `renderer` argument of sigma instance as `settings`. | An object including any of  [these](https://github.com/jacomyal/sigma.js/wiki/Settings#renderers-settings) |
| camera | camera | camera string id. |
| forceAtlas2Settings | None. Passed to `startForceAtlas2` on sigma instance. | Plugin settings [here](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2) |
| enableDragNodes | None. Enables dragNodes plugin. | | |

| graph-node attribute | sigma.js equivalent | description |
| --- | --- | --- |
| id | id | unique id for node object |
| label | label | String label |
| x | x | Number |
| y | y | Number |
| size | size | Number |
| color | color | color hex |
| type | type | One of: `square`,`circle`,`cross`,`equilateral`,`star`,`diamond`,`pacman` |
| image | image | Object with property names: `url`, `clip`, `scale`, `w`, `h`. Use one of `type` when using `image`. [More here.](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes) |
| equilateral | equilateral | Object with property names: `rotate`, `numPoints`. Use when type=`equilateral`. [More here.](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes) |
| star | star | Object with property names: `innerRatio`, `numPoints`. Use when type=`star`. [More here.](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes) |
| cross | cross | Object with property name: `lineWeight`. Use when type=`cross`. [More here.](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes) | |


| graph-edge attribute | sigma.js equivalent | description |
| --- | --- | --- |
| id | id | unique id for edge object |
| label | label | String label |
| source | source | source node id |
| target | target | target node id |
| size | size | Number |
| color | color | color hex |
| type | type | One of: `def`, `arrow`, `curve`, `curvedArrow`, `dashed`, `dotted`, `parallel`, `tapered` |

### Actions

All actions are set to the SigmaGraph component. For example:

```
{{#sigma-graph clickNode=onClickNode }}{{/sigma-graph}}
```

```
export default Ember.Component.extend({

  // event is dispatched with node object as argument
  onClickNode: function(node) {

  }

});
```

Supported actions are:

* `clickNode`
* `rightClickNode`
* `overNode`
* `doubleClickNode`
* `outNode`
* `downNode`
* `upNode`
* `clickEdge`
* `rightClickEdge`
* `overEdge`
* `doubleClickEdge`
* `outEdge`
* `downEdge`
* `upEdge`
* `click`
* `rightClick`
* `clickStage`
* `doubleClickStage`
* `rightClickStage`
* `clickNodes`
* `doubleClickNodes`
* `rightClickNodes`
* `overNodes`
* `outNodes`
* `downNodes`
* `upNodes`

NOTE: in order to enable edge hovering events, set `enableEdgeHovering` to true in sigma-graph `settings`.

dragNodes plugin actions, also set on SigmaGraph:

* `startdrag`
* `drag`
* `drop`
* `dragend`

See the [Sigma Events API](https://github.com/jacomyal/sigma.js/wiki/Events-API) for more information.

### Plugins

The sigma.js library provides [plugins](https://github.com/jacomyal/sigma.js/tree/master/plugins) in addition to the core functionality. Here are the plugins currently supported by ember-sigmajs:

* sigma.renderers.customShapes
* sigma.renderers.customEdgeShapes
* sigma.layout.forceAtlas2
* sigma.plugins.dragNodes
* sigma.renderers.edgeLabels

More will be supported in future releases.

## Background

The addon utilizes the parent-child helper pattern developed in [ember-composability-tools](https://github.com/miguelcobain/ember-composability-tools).

GraphNodes and GraphEdges are tagless (empty `tagName`) child components of the SigmaGraph component. They are not strictly necessary, but they provide convenience.

This addon is still experimental. Contributions are welcome and encouraged. There may be issues with either this addon or the [sigma.js library](https://github.com/jacomyal/sigma.js/issues), so it's worth taking a look there to see if the issue has already been noticed.

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
