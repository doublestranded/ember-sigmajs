import Ember from 'ember';

export default Ember.Controller.extend({
  showGraph: true,
  actions: {
    toggleGraph() {
      this.toggleProperty('showGraph');
    }
  }
});
