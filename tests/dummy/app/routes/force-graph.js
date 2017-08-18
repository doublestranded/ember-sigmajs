import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      forceAtlas2Settings: {},
      nodes: [{ id: 'n101', label: 'Hello', x: 0, y: 0, size: 1, color: '#f00', type: 'square'}],
      edges: [{id: 'e501', source: 'n101', target: 'n1', label: 'the edge', size: 3, type: 'arrow'}]
    });
  }
});
