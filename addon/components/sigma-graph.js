import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
/*global sigma */

export default Ember.Component.extend(ParentMixin, {

  attributeBindings: ['settings', 'batchData'],

  classNames: ['sigma-graph'],

  settings: {},

  _batched: false,

  sigma: function() {
    return this._sigma;
  },

  graphModel: function() {
    return this.sigma().graph;
  },

  isBatched: function() {
    return this._batched;
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

  didInsertParent: function() {
    const { element, settings, batchData } = this;
    if (batchData) {
      try {
        this._sigma = new sigma({
          graph: batchData,
          renderer: { container: element, type: 'canvas' },
          settings: settings
        });
      }
      catch(e) {
        Ember.Logger.error(e);
      }
      this._batched = true;
    }
    else {
      try {
        this._sigma = new sigma({
          renderer: { container: element, type: 'canvas' },
          settings: settings
        });
      }
      catch(e) {
        Ember.Logger.error(e.message);
      }
    }
    this._bindEvents();
    this._super(...arguments);
    this.sigma().refresh();
  },

  willDestroyParent: function() {
    this._super(...arguments);
    this._unbindEvents();
    this.sigma().kill();
    delete this.sigma();
  },

  _unbindEvents: function() {
    this.get('events').forEach((eventName) => {
      this.sigma().unbind(eventName);
    });
  }
});
