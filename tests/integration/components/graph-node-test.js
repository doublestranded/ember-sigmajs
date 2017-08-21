import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import GraphNode from 'ember-sigmajs/components/graph-node';

let graphNode;

moduleForComponent('graph-node', 'Integration | Component | graph node', {
  integration: true,
  beforeEach() {
    this.register('component:graph-node', GraphNode.extend({
      init() {
        this._super(...arguments);
        graphNode = this;
      }
    }));
  }
});

test('cannot be rendered without sigma-graph parent', function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs`{{#graph-node}}{{/graph-node}}`);
  }, /Assertion Failed: Tried to use .* outside the context of a parent component\./)
});

test('it renders with sigma-graph parent', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{#sigma-graph}}
                    {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
                    {{/graph-node}}
                  {{/sigma-graph}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sigma-graph}}
      {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
        template block text
      {{/graph-node}}
    {{/sigma-graph}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('node properties observed', function(assert) {
  this.render(hbs`
    {{#sigma-graph}}
      {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
      {{/graph-node}}
    {{/sigma-graph}}
  `);
  graphNode.set('color', '#f0f');
  assert.equal(graphNode.get('color'), '#f0f');
});
