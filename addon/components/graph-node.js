import Ember from 'ember';
import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({

  attrNames: ['label', 'x', 'y', 'size', 'color', 'type'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      try {
          this.graphModel().addNode(this.getAttrs());
      }
      catch(e) {
          Ember.Logger.error(e);
      }
      this.sigma().refresh();
    }
  },

  willDestroyParent: function() {
    this._super(...arguments);
    if (this.sigma()) {
      if (this.graphModel().nodes(this.get('id'))) {
        this.graphModel().dropNode(this.get('id'));
        this.sigma().refresh();
      }
    }
  }
});
