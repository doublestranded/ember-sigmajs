import Ember from 'ember';
import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({

  sigmaProperties: ['source', 'target', 'label', 'size', 'color', 'type'],

  dynamicSigmaProperties: ['label', 'size', 'color', 'type'],

  _changeProperty: function(property) {
    let child = this.graphModel().edges(this.id);
    child[property] = this.get(property);
    this._super(...arguments);
  },

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      let attrs = this.getAttrs();
      if (this.graphModel().nodes(attrs.source) && this.graphModel().nodes(attrs.target)) {
        try {
            this.graphModel().addEdge(attrs);
            this.sigma().refresh();
        }
        catch(e) {
            Ember.Logger.error(e);
        }
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
