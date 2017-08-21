import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
/*global sigma */
/*global CustomShapes */

export default Ember.Component.extend(ParentMixin, {

  attributeBindings: ['sigmaInst', 'settings', 'rendererType', 'rendererSettings', 'camera'],

  classNames: ['sigma-graph'],

  graphData: {},

  settings: {},

  rendererType: 'canvas',

  rendererSettings: {},

  _forceAtlas2: false,

  _enableDragNodes: false,

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

  dragEvents: ['startdrag', 'drag', 'drop', 'dragend'],

  _bindEvents: function() {
    this.get('events').forEach((eventName) => {
      if (typeof this.get(eventName) !== "undefined") {
        this.sigma().bind(eventName, this.get(eventName));
      }
    });

    if (this._enableDragNodes && this._dragListener) {
      this.get('dragEvents').forEach((eventName) => {
        this._dragListener.bind(eventName, (e) => {
          this.sendAction(eventName, e.data.node, this.sigma());
        });
      });
    }
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

  _addObservers: function() {
    this.addObserver('graphData', this, this._changeGraphData);
  },

  _removeObservers: function() {
    this.removeObserver('graphData', this, this._changeGraphData);
  },

  _addSigmaInst: function(sigmaInst, renderer) {
    this._sigma = sigmaInst;
    this._sigma.addRenderer(renderer);
  },

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
    if (enableDragNodes) {
      this._enableDragNodes = true;
      this._dragListener = new sigma.plugins.dragNodes(this.sigma(), this.sigma().renderers[0]);
    }

    this._addObservers();
    this._bindEvents();
    this._super(...arguments);
    this.sigma().refresh();
  },

  willDestroyParent: function() {
    this._super(...arguments);
    if (this._enableDragNodes) {
      sigma.plugins.killDragNodes(this.sigma());
    }
    this._removeObservers();
    this._unbindEvents();
    if (this._forceAtlas2) {
      this.sigma().killForceAtlas2();
    }
    this.sigma().kill();
    delete this.sigma();
  },

  _unbindEvents: function() {
    this.get('events').forEach((eventName) => {
      this.sigma().unbind(eventName);
    });

    if (this._enableDragNodes && this._dragListener) {
      this.get('dragEvents').forEach((eventName) => {
        this._dragListener.unbind(eventName);
      });
    }
  }
});
