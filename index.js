/* eslint-env node */
'use strict';
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-sigmajs',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // Borrowed from a few existing addons:
    // e.g. https://github.com/jamesleebaker/ember-truncate/blob/0fc5b9811ac7d8b30e610ebdc1e290b37c9ffdb3/index.js

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    }
    // Otherwise, we'll use this implementation borrowed from the _findHost()
    // method in ember-cli.
    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    var current = this;
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    app.import('vendor/sigma/sigma.min.js');
    app.import('vendor/sigma/plugins/sigma.plugins.dragNodes.min.js');
    app.import('vendor/sigma/plugins/sigma.renderers.customEdgeShapes.min.js');
    app.import('vendor/sigma/plugins/sigma.renderers.customShapes.min.js');
    app.import('vendor/sigma/plugins/sigma.layout.forceAtlas2.min.js');
    app.import('vendor/sigma/plugins/sigma.renderers.edgeLabels.min.js');
  },

  treeForVendor: function(vendorTree){
    var sigmaPath = path.dirname(require.resolve('sigma'));

    var trees = [];
    if(vendorTree){
      trees.push(vendorTree);
    }

    var sigmaTree = new Funnel(sigmaPath, {
      srcDir: '/',
      destDir: 'sigma',
    });

    trees.push(sigmaTree);

    return new MergeTrees(trees, { overwrite: true });
  }
};
