import { module, test, setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('sigma-child-base', 'Integration | Component | sigma child base', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('cannot be rendered without sigma-graph parent', async function (assert) {
    setupOnerror(function (err) {
      assert.ok(err.message.match(/Tried to use .* outside the context of a parent component\./));
    });

    await render(hbs`{{#sigma-child-base}}{{/sigma-child-base}}`);
  });
});
