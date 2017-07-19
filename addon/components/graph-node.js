import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  attributeBindings: ['label', 'x', 'y', 'size', 'color'],

  didInsertParent: function() {
    if (this.get('parentComponent')) {
      let attrs = { id: this.get('id') };
      this.get('attributeBindings').forEach((attr) => {
        if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
      });
      this.get('parentComponent')._graph.graph.addNode(attrs);
      if (!this.get('refreshed')) this.get('parentComponent')._graph.refresh();
    }
  },

  willDestroyElement: function() {
    this._super(...arguments);
    if (this.get('parentComponent')._graph) {
      if (this.get('parentComponent')._graph.graph.nodes(this.get('id'))) {
        this.get('parentComponent')._graph.graph.dropNode(this.get('id'));
        this.get('parentComponent')._graph.refresh();
      }
    }
  }
});
