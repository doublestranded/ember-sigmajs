import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sigma-graph'],

  attributeBindings: ['nodes', 'edges'],

  nodes: [],

  edges: [],

  didInsertElement: function() {
    var context = this.get('element');
    var s = new sigma(context);
    for (var i in this.get('nodes')) {
      s.graph.addNode(this.get('nodes')[i]);
    }
    for (var j in this.get('edges')) {
      s.graph.addEdge(this.get('edges')[j]);
    }
    s.refresh();
  },

  didDestroyElement: function() {

  }
});
