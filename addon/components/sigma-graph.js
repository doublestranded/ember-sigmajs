import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ParentMixin, {
  classNames: ['sigma-graph'],

  didInsertElement: function() {
    var context = this.get('element');
    this._graph = new sigma(context);
    this._super(...arguments);
  },

  invokeChildDidInsertHooks() {
    this._super(...arguments);
    this._graph.refresh();
  },

  didDestroyElement: function() {

  }
});
