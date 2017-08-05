import Ember from 'ember';

export default Ember.Component.extend({
  onClick: function() {
    // console.log('test click');
  },
  onClickNode: function(/*node*/) {
    // console.log('test click node ' + node.data.node.label);
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
    }
  }
});
