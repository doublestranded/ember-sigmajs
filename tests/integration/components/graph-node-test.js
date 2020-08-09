import { module, test, setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import GraphNode from 'ember-sigmajs/components/graph-node';
import SigmaGraph from 'ember-sigmajs/components/sigma-graph';

let graphNode;
let sigmaGraph;

module('graph-node', 'Integration | Component | graph node', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:graph-node', GraphNode.extend({
      init() {
        this._super(...arguments);
        graphNode = this;
      }
    }));

    this.owner.register('component:sigma-graph', SigmaGraph.extend({
      init() {
        this._super(...arguments);
        sigmaGraph = this;
      }
    }));
  });

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('cannot be rendered without sigma-graph parent', async function (assert) {
    setupOnerror(function (err) {
      assert.ok(err.message.match(/Tried to use .* outside the context of a parent component\./));
    });

    await render(hbs`{{#graph-node}}{{/graph-node}}`);
  });

  test('it renders with sigma-graph parent', async function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{#sigma-graph}}
                      {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
                      {{/graph-node}}
                    {{/sigma-graph}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders with sigma-graph parent and text', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#sigma-graph}}
        {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color="#f00"}}
          template block text
        {{/graph-node}}
      {{/sigma-graph}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('node attributes updated', async function (assert) {
    this.set('color', '#f00');
    await render(hbs`
      {{#sigma-graph}}
        {{#graph-node id="n0" label="hello" x=0 y=0 size=1 color=color}}
        {{/graph-node}}
      {{/sigma-graph}}
    `);
    assert.equal(sigmaGraph.graphModel().nodes(graphNode.id).color, '#f00');
    this.set('color', '#f0f');
    assert.equal(sigmaGraph.graphModel().nodes(graphNode.id).color, '#f0f');
  });

});
