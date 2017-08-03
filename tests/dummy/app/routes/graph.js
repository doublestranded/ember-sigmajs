import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      settings: { minEdgeSize: 0, maxEdgeSize: 0, enableEdgeHovering: true },
      rendererSettings: { edgeColor: "target" },
      nodes: [{ id: 'n0', label: 'Hello', x: 0, y: 0, size: 1, color: '#f00', type: 'square'},{ id: 'n1', label: 'World !',x: 1, y: 1, size: 1, color: '#00f', type: 'circle'}],
      edges: [{id: 'e0', source: 'n0', target: 'n1', label: 'the edge', size: 3, type: 'arrow'}]
    });
  }
});
