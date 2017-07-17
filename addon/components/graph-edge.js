import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  attributeBindings: ['source', 'target'],

  didInsertParent: function() {
    if (this.get('parentComponent')) {
      var self = this;
      this.get('parentComponent')._graph.graph.addEdge({
        id: self.get('id'),
        source: self.get('source'),
        target: self.get('target')
      });
    }
  }
});
