import SigmaBase from './sigma-base';
import { ChildMixin } from 'ember-composability-tools';

export default SigmaBase.extend(ChildMixin, {
  attributeBindings: ['label', 'x', 'y', 'size', 'color'],

  events: ['clickNode',
          'rightClickNode',
          'overNode',
          'doubleClickNode',
          'outNode',
          'downNode',
          'upNode'],

  didInsertParent: function() {
    this._super(...arguments);
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
