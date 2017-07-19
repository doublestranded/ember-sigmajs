import Ember from 'ember';

export default Ember.Controller.extend({
  showEdge: true,
  showNode: true,
  showGraph: true,
  actions: {
    toggleEdge() {
      this.toggleProperty('showEdge');
    },
    toggleNode() {
      this.toggleProperty('showNode');
    },
    toggleGraph() {
      this.toggleProperty('showGraph');
    }
  }
});
