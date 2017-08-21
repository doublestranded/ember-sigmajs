import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {

  tagName: '',

  sigma: function() {
    return this.get('parentComponent').sigma();
  },

  graphModel: function() {
    return this.get('parentComponent').graphModel();
  },

  _changeProperty: function() {
    this.sigma().refresh();
  },

  _addObservers: function() {
    this.get('properties').forEach(function(property){
      this.addObserver(property, this, this._changeProperty);
    }, this);
  },

  _removeObservers: function() {
    this.get('properties').forEach(function(property){
      this.removeObserver(property, this, this._changeProperty);
    }, this);
  },

  didInsertParent: function() {
    this._super(...arguments);
    this._addObservers();
  },

  willDestroyParent: function() {
    this._super(...arguments);
    this._removeObservers();
  },

  getAttrs: function() {
    let attrs = { id: this.get('id') };
    this.get('attrNames').forEach((attr) => {
      if (typeof this.get(attr) !== "undefined") attrs[attr] = this.get(attr);
    });
    return attrs;
  }
});
