import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ParentMixin, {
  attributeBindings: ['style'],

  didInsertElement: function() {
    var context = this.get('element');
    var s = new sigma(context);
    this.set('graph', s);
    s.refresh();
  },

  didDestroyElement: function() {

  }
});
