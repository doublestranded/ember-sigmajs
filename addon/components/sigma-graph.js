import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
import diffAttrs from 'ember-diff-attrs';
/*global sigma */
/*global CustomShapes */

export default Ember.Component.extend(ParentMixin, {
  classNames: ['sigma-graph'],

  graphData: {},

  settings: {},

  rendererType: 'canvas',

  rendererSettings: {},

  _forceAtlas2: false,

  _dragNodesEnabled: false,

  didReceiveAttrs: diffAttrs({
    keys: ['graphData', 'enableDragNodes'],
    hook: function(changedAttrs, ...args) {
      this._super(...args);
      if(changedAttrs) {
        if (changedAttrs.graphData) {
          this._changeGraphData();
        }
        if (changedAttrs.enableDragNodes) {
          this._toggleDragNodes(changedAttrs.enableDragNodes[1]);
        }
      }
    }
  }),

  didInsertParent: function() {
    const { sigmaInst,
            element,
            settings,
            graphData,
            rendererType,
            rendererSettings,
            camera,
            forceAtlas2,
            enableDragNodes } = this;
    let options = {
      renderer: {
        container: element,
        type: rendererType,
        settings: rendererSettings,
        camera: camera
      },
      settings: settings
    }
    if (graphData) {
      options['graph'] = graphData;
    }
    try {
      if (sigmaInst) {
          this._addSigmaInst(sigmaInst, options.renderer);
      }
      else {
          this._sigma = new sigma(options);
      }
    }
    catch(e) {
      Ember.Logger.error(e);
    }

    //plugin
    CustomShapes.init(this.sigma());
    if (forceAtlas2 !== undefined) {
      this.sigma().startForceAtlas2(forceAtlas2);
      this._forceAtlas2 = true;
    }
    this._toggleDragNodes(enableDragNodes);

    this._bindEvents();
    this._super(...arguments);
    this.sigma().refresh();
  },

  willDestroyParent: function() {
    this._super(...arguments);
    this._toggleDragNodes(false);
    this._unbindEvents();
    if (this._forceAtlas2) {
      this.sigma().killForceAtlas2();
    }
    this.sigma().kill();
    delete this.sigma();
  },

  sigma: function() {
    return this._sigma;
  },

  graphModel: function() {
    return this.sigma().graph;
  },

  events: [
    'clickNode',
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
    'upNodes'
  ],

  dragEvents: ['startdrag', 'drag', 'drop', 'dragend'],

  _bindEvents: function() {
    this.get('events').forEach((eventName) => {
      if (typeof this.get(eventName) !== "undefined") {
        this.sigma().bind(eventName, this.get(eventName));
      }
    });
  },

  _changeGraphData: function() {
    try {
      this.graphModel().clear();
      this.graphModel().read(this.get('graphData'));
      this.sigma().refresh();
    }
    catch(e) {
      Ember.Logger.error(e);
    }
  },

  _addSigmaInst: function(sigmaInst, renderer) {
    this._sigma = sigmaInst;
    this._sigma.addRenderer(renderer);
  },

  _enableDragNodes: function() {
    if (this._dragNodesListener) {
      this.get('dragEvents').forEach((eventName) => {
        this._dragNodesListener.bind(eventName, (e) => {
          this.sendAction(eventName, e.data.node, this.sigma());
        });
      });
    }
  },

  _disableDragNodes: function() {
    if (this._dragNodesListener) {
      this.get('dragEvents').forEach((eventName) => {
        this._dragNodesListener.unbind(eventName);
      });
    }
  },

  _toggleDragNodes: function(enableDragNodes) {
    if (enableDragNodes) {
      if (!this._dragNodesEnabled) {
        this._dragNodesListener = new sigma.plugins.dragNodes(this.sigma(), this.sigma().renderers[0]);
        this._enableDragNodes();
      }
    }
    else {
      if (this._dragNodesEnabled) {
        sigma.plugins.killDragNodes(this.sigma());
        this._disableDragNodes();
      }
    }
    this._dragNodesEnabled = enableDragNodes;
  },

  _unbindEvents: function() {
    this.get('events').forEach((eventName) => {
      this.sigma().unbind(eventName);
    });
  }
});
