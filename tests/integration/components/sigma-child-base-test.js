import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sigma-child-base', 'Integration | Component | sigma child base', {
  integration: true
});

test('cannot be rendered without sigma-graph parent', function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs`{{#sigma-child-base}}{{/sigma-child-base}}`);
  }, /Assertion Failed: Tried to use .* outside the context of a parent component\./);
});
