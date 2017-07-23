import SigmaChildBase from './sigma-child-base';

export default SigmaChildBase.extend({
  attributeBindings: ['source', 'target'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      let attrs = { id: this.get('id') };
      this.get('attributeBindings').forEach((attr) => {
        if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
      });
      if (this.graphModel().nodes(attrs.source) && this.graphModel().nodes(attrs.target)) {
        this.graphModel().addEdge(attrs);
        if (!this.get('refreshed')) this.sigma().refresh();
      }
    }
  },

  willDestroyElement: function() {
    this._super(...arguments);
    if (this.sigma()) {
      if (this.graphModel().edges(this.get('id'))) {
        this.graphModel().dropEdge(this.get('id'));
        this.sigma().refresh();
      }
    }
  }
});
