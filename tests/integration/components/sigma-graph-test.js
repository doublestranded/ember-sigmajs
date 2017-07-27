import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import SigmaGraph from 'ember-sigmajs/components/sigma-graph';

let sigmaGraph;

moduleForComponent('sigma-graph', 'Integration | Component | sigma graph', {
  integration: true,
  beforeEach() {
    // Technique borrowed from
    // https://github.com/miguelcobain/ember-leaflet/blob/master/tests/integration/components/popup-test.js
    this.register('component:sigma-graph', SigmaGraph.extend({
      init() {
        this._super(...arguments);
        sigmaGraph = this;
      }
    }));
  }
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

test('click node event', function(assert) {
  this.set('onClickNode', (arg) => {
    assert.equal(arg.data.node.id, 'n0');
    assert.equal(arg.type, 'clickNode');
  });
  this.render(hbs`{{#sigma-graph clickNode=(action onClickNode) }}
                    {{#graph-node id="n0" label="hello" x=1 y=0 size=10 color="#f00"}}
                    {{/graph-node}}
                  {{/sigma-graph}}`);

  sigmaGraph._sigma.dispatchEvent('clickNode', { node: sigmaGraph._sigma.graph.nodes()[0] });
});

test('batch data', function(assert) {
  this.set('model', { batchData: {
      nodes: [{ id: 'n0' }, { id: 'n1' }],
      edges: [{ id: 'e0', source: 'n0', target: 'n1'}]
    }
  });
  this.render(hbs`{{#sigma-graph batchData=model.batchData }}
                  {{/sigma-graph}}`);
  assert.equal(sigmaGraph._sigma.graph.nodes().length, 2);
});

test('new child components allowed given batch data', function(assert) {
  this.set('model', { batchData: {
      nodes: [{ id: 'n0' }, { id: 'n1' }],
      edges: [{ id: 'e0', source: 'n0', target: 'n1'}]
    }
  });
  this.render(hbs`{{#sigma-graph batchData=model.batchData }}
                    {{#graph-node id="n2" label="goodbye" x=0 y=1 size=10 color="#f00"}}
                    {{/graph-node}}
                  {{/sigma-graph}}`);
  assert.equal(sigmaGraph._sigma.graph.nodes().length, 3);
});
