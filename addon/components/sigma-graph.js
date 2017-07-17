import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sigma-graph'],

  attributeBindings: ['nodes', 'edges'],

  nodes: [],

  edges: [],

  didInsertElement: function() {
    var context = this.get('element');
    var s = new sigma(context);
    this.get('nodes').forEach(function(node){
      s.graph.addNode(node);
    });
    this.get('edges').forEach(function(edge){
      s.graph.addEdge(edge);
    });
    s.refresh();
  },

  didDestroyElement: function() {

  }
});
