import SigmaBase from './sigma-base';
import { ChildMixin } from 'ember-composability-tools';

export default SigmaBase.extend(ChildMixin, {
  attributeBindings: ['label', 'x', 'y', 'size', 'color'],

  events: ['clickNode',
          'rightClickNode',
          'overNode',
          'doubleClickNode',
          'outNode',
          'downNode',
          'upNode'],

  didInsertParent: function() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.graph().graph.addNode({
        id: this.get('id'),
        label: this.get('label'),
        x: this.get('x'),
        y: this.get('y'),
        size: this.get('size'),
        color: this.get('color')
      });
    }
  }
});
