/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-sigmajs',
  included: function(app) {
    this._super.included(app);
    app.import('./vendor/sigma.min.js');
  }
};
