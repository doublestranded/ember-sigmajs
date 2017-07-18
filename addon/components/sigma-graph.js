import SigmaBase from './sigma-base';
import { ParentMixin } from 'ember-composability-tools';

export default SigmaBase.extend(ParentMixin, {
  classNames: ['sigma-graph'],

  events: ['click',
          // 'rightClick',
          // 'clickStage',
          // 'doubleClickStage',
          // 'rightClickStage',
          // 'clickNodes',
          // 'doubleClickNodes',
          // 'rightClickNodes',
          // 'overNodes',
          // 'outNode',
          // 'outNodes',
          // 'downNode',
          // 'downNodes',
          // 'upNode',
          // 'upNodes'
        ],

  didInsertElement: function() {
    let context = this.get('element');
    this._graph = new sigma(context);
    this._super(...arguments);
  },

  invokeChildDidInsertHooks() {
    this._super(...arguments);
    this._graph.refresh();
  },

  // TODO
  // didDestroyElement: function() {
  //
  // }
});
