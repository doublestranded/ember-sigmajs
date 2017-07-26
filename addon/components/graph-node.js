import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({

  attrNames: ['label', 'x', 'y', 'size', 'color', 'type'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.graphModel().addNode(this.getAttrs());
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
