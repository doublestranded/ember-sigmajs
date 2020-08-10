import Ember from 'ember';
import EmberError from '@ember/error';
import { ChildMixin } from 'ember-composability-tools';
import diffAttrs from 'ember-diff-attrs';

export default Ember.Component.extend(ChildMixin, {

  tagName: '',

  init: function () {
    if (!this.get('parentComponent')) {
      throw new EmberError(
        `Tried to use ${this} outside the context of a parent component.`,
        this.get('parentComponent')
      );
    }
    this._super(...arguments);
  },

  didReceiveAttrs: function () {
    this._super(...arguments);
    if (!this.get('diffAttrsFunc')) {
      this.set('diffAttrsFunc', diffAttrs({
        keys: this.get('dynamicSigmaProperties'),
        hook: function (changedAttrs, ...args) {
          this._super(...args);
          if (changedAttrs) {
            Object.keys(changedAttrs).forEach(function (attr) {
              this._changeProperty(attr);
            }, this);
          }
        }
      }));
    }
    this.get('diffAttrsFunc').apply(this);
  },

  didInsertParent: function () {
    this._super(...arguments);
  },

  willDestroyParent: function () {
    this._super(...arguments);
  },

  sigma: function () {
    return this.get('parentComponent').sigma();
  },

  graphModel: function () {
    return this.get('parentComponent').graphModel();
  },

  _changeProperty: function () {
    this.sigma().refresh();
  },

  getSigmaProperties: function () {
    let props = { id: this.get('id') };
    this.get('sigmaProperties').forEach((prop) => {
      if (typeof this.get(prop) !== "undefined") props[prop] = this.get(prop);
    });
    return props;
  }
});
