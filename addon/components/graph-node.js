import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  attributeBindings: ['label', 'x', 'y', 'size', 'color'],

  didInsertParent: function() {
    if (this.get('parentComponent')) {
      var self = this;
      this.get('parentComponent')._graph.graph.addNode({
        id: self.get('id'),
        label: self.get('label'),
        x: self.get('x'),
        y: self.get('y'),
        size: self.get('size'),
        color: self.get('color')
      });
    }
  }
});
