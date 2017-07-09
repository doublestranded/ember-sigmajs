import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sigma-graph', 'Integration | Component | sigma graph', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sigma-graph}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sigma-graph}}
      template block text
    {{/sigma-graph}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
