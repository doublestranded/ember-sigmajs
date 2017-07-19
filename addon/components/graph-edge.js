import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  attributeBindings: ['source', 'target'],

  didInsertParent: function() {
    if (this.get('parentComponent')) {
      let attrs = { id: this.get('id') };
      this.get('attributeBindings').forEach((attr) => {
        if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
      });
      let graph = this.get('parentComponent')._graph.graph;
      if (graph.nodes(attrs.source) && graph.nodes(attrs.target)) {
        graph.addEdge(attrs);
        if (!this.get('refreshed')) this.get('parentComponent')._graph.refresh();
      }
    }
  },

  willDestroyElement: function() {
    this._super(...arguments);
    if (this.get('parentComponent')._graph) {
      if (this.get('parentComponent')._graph.graph.edges(this.get('id'))) {
        this.get('parentComponent')._graph.graph.dropEdge(this.get('id'));
        this.get('parentComponent')._graph.refresh();
      }
    }
  }
});
