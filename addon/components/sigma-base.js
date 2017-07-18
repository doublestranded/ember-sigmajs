import Ember from 'ember';

export default Ember.Component.extend({
  events: [],

  didInsertParent: function() {
    this._super(...arguments);
    this._bindEvents();
  },

  graph: function() {
    return this._graph || this.get('parentComponent')._graph;
  },

  _bindEvents: function() {
    this.get('events').forEach((eventName) => {
      if (this.get(eventName) !== undefined) {
        this.graph().bind(eventName, this.get(eventName));
      }
    });
  },
});
