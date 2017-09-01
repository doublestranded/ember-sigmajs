import Ember from 'ember';

export default Ember.Component.extend({
  onClick: function() {
    // console.log('test click');
  },
  onOverNode: function(/*node*/) {
    // console.log('test over node ' + node.data.node.label);
  },
  onOverEdge: function(/*edge*/) {
    // console.log(edge);
  },
  onClickEdge: function(/*edge*/) {
    // console.log(edge);
  },
  onClickNodes: function(/*nodes*/) {
    // console.log(nodes);
  },
  onDragEnd: function(/*node, graph*/) {
    // console.log(node);
  },
  actions: {
    toggleEdge: function() {
      this.sendAction('toggleEdge');
    },
    toggleNode: function() {
      this.sendAction('toggleNode');
    },
    toggleGraph: function() {
      this.sendAction('toggleGraph');
    },
    onClickNode: function(/*node*/) {
      this.sendAction('onClickNode');
    },
  }
});
