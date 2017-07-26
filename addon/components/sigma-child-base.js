import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';
const { assert } = Ember;

export default Ember.Component.extend(ChildMixin, {
  tagName: '',

  sigma: function() {
    return this.get('parentComponent').sigma();
  },

  graphModel: function() {
    return this.get('parentComponent').graphModel();
  },

  getAttrs: function() {
    let attrs = { id: this.get('id') };
    this.get('attrNames').forEach((attr) => {
      if (this.get(attr) !== undefined) attrs[attr] = this.get(attr);
    });
    return attrs;
  },

  didInsertParent: function() {
    if (this.get('parentComponent').isBatched()) {
      assert('Graph is instantiated with batch data.');
    }
    this._super(...arguments);
  }
});
