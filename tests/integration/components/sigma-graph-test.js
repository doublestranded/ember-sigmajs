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

test('click event', function(assert) {
  this.set('onClick', (arg) => {
    assert.equal(arg.type, 'click');
  });
  this.render(hbs`{{#sigma-graph click=onClick}}{{/sigma-graph}}`);
  this.$('div').click();
});

// TODO
// test('click node event', function(assert) {
//   this.set('onClickNode', (arg) => {
//     assert.equal(arg.type, 'clickNode');
//   });
//   this.render(hbs`{{#sigma-graph clickNode=(action onClickNode) }}
//                     {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
//                     {{/graph-node}}
//                   {{/sigma-graph}}`);
//   this.$('#n0').trigger('click');
// });
