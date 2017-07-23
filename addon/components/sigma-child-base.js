import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  sigma: function() {
    return this.get('parentComponent').sigma();
  },

  graphModel: function() {
    return this.get('parentComponent').graphModel();
  },

  getAttrs: function() {
    let attrs = { id: this.get('id') };
    this.get('attributeBindings').forEach((attr) => {
      if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
    });
    return attrs;
  }
});
