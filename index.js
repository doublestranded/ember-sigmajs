/* eslint-env node */
'use strict';
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var path = require('path');

// Borrowed from:
//https://github.com/knownasilya/ember-toastr/blob/master/index.js

module.exports = {
  name: 'ember-sigmajs',

  included: function(app) {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();
    app.import('vendor/sigma/sigma.min.js');
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
  },

  _ensureThisImport: function() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
