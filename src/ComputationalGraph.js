const backbone = require('backbone');
const d3 = require('d3');
const dagreD3 = require('dagre-D3');
const yo = require('yo-yo');
const _ = require('lodash');

class ComputationalGraph {
  constructor(container) {
    _.extend(this, backbone.Events);
    this.Styles.apply();
    this.container = container;
  }

  buildFromText(text) {
    this.container.innerHTML = '';

    // Assign these variables globally so that they can be used/modified
    // from the dynamic script
    window.g = new dagreD3.graphlib.Graph().setGraph({});
    window.d3 = d3;
    window.dagreD3;

    const onload = () => {
      var render = new dagreD3.render();

      // Set up an SVG group so that we can translate the final graph.
      var content = yo`<svg style="${this.Styles.content}"></svg>`;
      this.container.appendChild(content);
      var svg = d3.select(content),
          inner = svg.append("g");

      // Run the renderer. This is what draws the final graph.
      render(inner, g);

      // Attach a click event to each node in the graph
      _.each(g.nodes(), (n) => {
        let node = g.node(n);
        node.elem.onclick = (...args) => this.trigger("node-clicked", ...[node, ...args]);
      });

      this.g = g;
    };

    // Dynamically load text into script element
    let script = yo`<script onload=${onload.bind(this)}>${text}</script>`;

    document.head.appendChild(script);
  }

  get Styles() {
    return {
      apply: () => {
        // Apply stylesheet:
        const stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerHTML = `
          text {
            font-weight: 300;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
            font-size: 14px;
          }

          .node rect {
              stroke: #333;
              fill: #fff;
              stroke-width: 1.5px;
          }

          .edgePath path.path {
            stroke: #333;
            fill: none;
            stroke-width: 1.5px;
          }

          .arrowhead {
            stroke: blue;
            fill: blue;
            stroke-width: 1.5px;
          }
        `;
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
      },
      content: `
        width: 100%;
        height: 100%
      `
    }
  }
}

module.exports = ComputationalGraph;
module.exports.ComputationalGraph = ComputationalGraph;
