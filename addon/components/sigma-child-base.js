import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';
import diffAttrs from 'ember-diff-attrs';

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

  didReceiveAttrs: function(){
    this._super(...arguments);
    if (!this.get('diffAttrsFunc')) {
      this.set('diffAttrsFunc', diffAttrs({
        keys: this.get('properties'),
        hook: function(changedAttrs, ...args) {
          this._super(...args);
          if(changedAttrs) {
            Object.keys(changedAttrs).forEach(function(attr){
              this._changeProperty(attr);
            }, this);
          }
        }
      }));
    }
    this.get('diffAttrsFunc').apply(this);
  },

  didInsertParent: function() {
    this._super(...arguments);
  },

  willDestroyParent: function() {
    this._super(...arguments);
  },

  getAttrs: function() {
    let attrs = { id: this.get('id') };
    this.get('attrNames').forEach((attr) => {
      if (typeof this.get(attr) !== "undefined") attrs[attr] = this.get(attr);
    });
    return attrs;
  }
});
