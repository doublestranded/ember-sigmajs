import { module, test, setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import GraphEdge from 'ember-sigmajs/components/graph-edge';
import SigmaGraph from 'ember-sigmajs/components/sigma-graph';

let graphEdge;
let sigmaGraph;

module('graph-edge', 'Integration | Component | graph edge', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:graph-edge', GraphEdge.extend({
      init() {
        this._super(...arguments);
        graphEdge = this;
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

    await render(hbs`<GraphEdge />`);
  });

  test('it renders with sigma-graph parent', async function (assert) {

    await render(hbs`<SigmaGraph>
                      <GraphNode @id='n0' @label='hello' @x={{0}} @y={{0}} @size={{1}} @color='#f00'/>
                      <GraphEdge @id='e0' @source='n0' @target='n1' />
                    </SigmaGraph>`);


    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders with sigma-graph parent with text', async function (assert) {
    await render(hbs`
      <SigmaGraph>
        <GraphNode @id='n0' @label='hello' @x={{0}} @y={{0}} @size={{1}} @color='#f00'/>
        <GraphEdge @id='e0' @source='n0' @target='n1'>
          template block text
        </GraphEdge>
      </SigmaGraph>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('edge attributes updated', async function (assert) {
    this.set('color', '#f00');
    await render(hbs`
      <SigmaGraph>
        <GraphNode @id='n0' @label='hello' @x={{0}} @y={{0}} @size={{1}} @color='#000'/>
        <GraphNode @id='n1' @label='hello' @x={{1}} @y={{1}} @size={{1}} @color='#a00'/>
        <GraphEdge @id='e0' @source='n0' @target='n1' @color={{this.color}} />
      </SigmaGraph>
    `);
    assert.equal(sigmaGraph.graphModel().edges(graphEdge.id).color, '#f00');
    this.set('color', '#f0f');
    assert.equal(sigmaGraph.graphModel().edges(graphEdge.id).color, '#f0f');
  });
});
