import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleGraph: function() {
      this.sendAction('toggleGraph');
    }
  }
});
