/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-sigmajs',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/sigma.js/src/sigma.min.js');
  }
};
