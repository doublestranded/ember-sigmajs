import Ember from 'ember';
import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({

  sigmaProperties: ['label', 'x', 'y', 'size', 'color', 'type', 'image', 'star', 'equilateral', 'cross'],

  dynamicSigmaProperties: ['label', 'x', 'y', 'size', 'color', 'type', 'image', 'star', 'equilateral', 'cross'],

  _changeProperty: function(property) {
    let child = this.graphModel().nodes(this.id);
    child[property] = this.get(property);
    this._super(...arguments);
  },

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      try {
          this.graphModel().addNode(this.getSigmaProperties());
          this.sigma().refresh();
      }
      catch(e) {
          Ember.Logger.error(e);
      }
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
