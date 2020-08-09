/* eslint-env node */
module.exports = {
  description: 'add sigma npm package',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackageToProject('sigma', '1.2.1');
  }
};
