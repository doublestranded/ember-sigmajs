import Ember from 'ember';
import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({

  attrNames: ['source', 'target', 'label', 'size', 'color', 'type'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      let attrs = this.getAttrs();
      if (this.graphModel().nodes(attrs.source) && this.graphModel().nodes(attrs.target)) {
        try {
            this.graphModel().addEdge(attrs);
        }
        catch(e) {
            Ember.Logger.error(e);
        }
        this.sigma().refresh();
      }
    }
  },

  willDestroyParent: function() {
    this._super(...arguments);
    if (this.sigma()) {
      if (this.graphModel().edges(this.get('id'))) {
        this.graphModel().dropEdge(this.get('id'));
        this.sigma().refresh();
      }
    }
  }
});
