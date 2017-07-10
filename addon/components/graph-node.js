import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  attributeBindings: ['id', 'label', 'x', 'y', 'size', 'color'],

  didInsertElement: function() {
    // if (this.get('parentComponent').hasOwnProperty('graph')) {
    //   // var self = this;
    //   // this.get('parentComponent').get('graph').graph.addNode({
    //   //   id: self.get('id'),
    //   //   label: self.get('label'),
    //   //   x: self.get('x'),
    //   //   y: self.get('y'),
    //   //   size: self.get('size'),
    //   //   color: self.get('color')
    //   // });
    // }
  },

  didInsertParent: function() {

  }
});
