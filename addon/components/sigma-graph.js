import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
/*global sigma */

export default Ember.Component.extend(ParentMixin, {

  attributeBindings: ['settings', 'rendererType', 'rendererSettings'],

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

  didInsertParent: function() {
    let context = this.get('element');
    let settings = this.get('settings') || {};
    let rendererType = this.get('rendererType') || 'canvas';
    let rendererSettings = this.get('rendererSettings') || {};
    this._sigma = new sigma({ renderer: { container: context, type: rendererType, settings: rendererSettings }, settings: settings });
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
