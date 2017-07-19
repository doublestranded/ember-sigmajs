import SigmaBase from './sigma-base';
import { ParentMixin } from 'ember-composability-tools';

export default SigmaBase.extend(ParentMixin, {
  attributeBindings: ['settings'],

  classNames: ['sigma-graph'],

  events: ['click',
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

  didInsertElement: function() {
    let context = this.get('element');
    let settings = this.get('settings') || {};
    this._graph = new sigma({ renderer: { container: context, type: 'canvas' }, settings: settings });
    this._super(...arguments);
    this._graph.refresh();
    this.set('refreshed', true);
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this._graph.graph.clear();
    delete this._graph;
  }
});
