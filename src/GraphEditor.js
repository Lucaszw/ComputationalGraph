const backbone = require('backbone');
const yo  = require('yo-yo');

const BaseEditor = require('./BaseEditor.js');
const DefaultGraph = require('./DefaultGraph.js.txt');

class GraphEditor extends BaseEditor{
  constructor(container, ...args) {
    super(container, ...args);
    const controls = yo`
      <div style="${this.Styles.controls}">
        <button onclick=${this.rebuildGraph.bind(this)}>Rebuild Graph</button>
      </div>`;
    container.appendChild(controls);
    this.editor.setValue(DefaultGraph);
  }
  rebuildGraph() {
    const text = this.editor.getValue();
    this.trigger("rebuildGraph", text);
  }
};

module.exports = GraphEditor;
module.exports.GraphEditor = GraphEditor;
