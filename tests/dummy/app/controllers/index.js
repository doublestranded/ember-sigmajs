import Ember from 'ember';

export default Ember.Controller.extend({
  showEdges: true,
  showNodes: true,
  showGraph: true,
  actions: {
    toggleEdge() {
      this.toggleProperty('showEdges');
    },
    toggleNode() {
      this.toggleProperty('showNodes');
      this.toggleProperty('showEdges');
    },
    toggleGraph() {
      this.toggleProperty('showGraph');
    },
    onClickNode: function() {
      this.set('model.nodeColor', '#f0f');
    }
  }
});
