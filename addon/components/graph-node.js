import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({
  attributeBindings: ['label', 'x', 'y', 'size', 'color'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      let attrs = { id: this.get('id') };
      this.get('attributeBindings').forEach((attr) => {
        if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
      });
      this.graphModel().addNode(attrs);
      if (!this.get('refreshed')) this.sigma().refresh();
    }
  },

  willDestroyElement: function() {
    this._super(...arguments);
    if (this.sigma()) {
      if (this.graphModel().nodes(this.get('id'))) {
        this.graphModel().dropNode(this.get('id'));
        this.sigma().refresh();
      }
    }
  }
});
