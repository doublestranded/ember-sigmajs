import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
/*global sigma */

export default Ember.Component.extend(ParentMixin, {
  attributeBindings: ['settings'],

  classNames: ['sigma-graph'],

  sigma: function() {
    return this._sigma;
  },

  graphModel: function() {
    return this.sigma().graph;
  },

  events: ['clickNode',
          'rightClickNode',
          'overNode',
          'doubleClickNode',
          'outNode',
          'downNode',
          'upNode',
          'clickEdge',
          'rightClickEdge',
          'overEdge',
          'doubleClickEdge',
          'outEdge',
          'downEdge',
          'upEdge',
          'click',
          'rightClick',
          'clickStage',
          'doubleClickStage',
          'rightClickStage',
          'clickNodes',
          'doubleClickNodes',
          'rightClickNodes',
          'overNodes',
          'outNodes',
          'downNodes',
          'upNodes'],

  _bindEvents: function() {
    this.get('events').forEach((eventName) => {
      if (this.get(eventName) !== undefined) {
        this.sigma().bind(eventName, this.get(eventName));
      }
    });
  },

  didInsertElement: function() {
    let context = this.get('element');
    let settings = this.get('settings') || {};
    this._sigma = new sigma({ renderer: { container: context, type: 'canvas' }, settings: settings });
    this._bindEvents();
    this._super(...arguments);
    this.sigma().refresh();
    this.set('refreshed', true);
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this._unbindEvents();
    this.graphModel().clear();
    delete this.sigma();
  },

  _unbindEvents: function() {
    this.get('events').forEach((eventName) => {
      this.sigma().unbind(eventName);
    });
  }
});
