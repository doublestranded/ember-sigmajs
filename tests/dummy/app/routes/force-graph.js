import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // From https://github.com/jacomyal/sigma.js/blob/master/examples/force.html
    var i,
        o,
        N = 100,
        E = 500,
        C = 5,
        d = 0.5,
        cs = [],
        g = {
          nodes: [],
          edges: []
        };
    // Generate the graph:
    for (i = 0; i < C; i++)
      cs.push({
        id: i,
        nodes: [],
        color: '#' + (
          Math.floor(Math.random() * 16777215).toString(16) + '000000'
        ).substr(0, 6)
      });
    for (i = 0; i < N; i++) {
      o = cs[(Math.random() * C) | 0];
      g.nodes.push({
        id: 'n' + i,
        label: 'Node' + i,
        x: 100 * Math.cos(2 * i * Math.PI / N),
        y: 100 * Math.sin(2 * i * Math.PI / N),
        size: Math.random(),
        color: o.color
      });
      o.nodes.push('n' + i);
    }
    for (i = 0; i < E; i++) {
      if (Math.random() < 1 - d)
        g.edges.push({
          id: 'e' + i,
          source: 'n' + ((Math.random() * N) | 0),
          target: 'n' + ((Math.random() * N) | 0)
        });
      else {
        o = cs[(Math.random() * C) | 0]
        g.edges.push({
          id: 'e' + i,
          source: o.nodes[(Math.random() * o.nodes.length) | 0],
          target: o.nodes[(Math.random() * o.nodes.length) | 0]
        });
      }
    }
    return Ember.RSVP.hash({
      graphData: g,
      forceAtlas2Settings: {},
      nodes: [{ id: 'n101', label: 'Hello', x: 0, y: 0, size: 1, color: '#f00', type: 'square'}],
      edges: [{id: 'e501', source: 'n101', target: 'n1', label: 'the edge', size: 3, type: 'arrow'}]
    });
  }
});
