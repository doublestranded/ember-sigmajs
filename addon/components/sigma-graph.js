import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],

  didInsertElement: function() {
    var context = this.get('element');
    var s = new sigma(context);
    s.graph.addNode({
      id: 'n0',
      label: 'Hello',
      x: 0,
      y: 0,
      size: 1,
      color: '#f00'
    }).addNode({
      id: 'n1',
      label: 'World !',
      x: 1,
      y: 1,
      size: 1,
      color: '#00f'
    }).addEdge({
      id: 'e0',
      source: 'n0',
      target: 'n1'
    });
    s.refresh();
  },

  didDestroyElement: function() {

  }
});
