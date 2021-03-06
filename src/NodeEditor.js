const BaseEditor = require('./BaseEditor');
const yo = require('yo-yo');
const _ = require('lodash');

class NodeEditor extends BaseEditor {
  constructor(container, ...args) {
    super(container, ...args);
    this.editor.setValue('// Select node to modify its contents');
    this.editor.on("change", this.documentModified.bind(this));
    this.documents = [];
    const controls = yo`
      <div style="${this.Styles.controls}">
        <button onclick=${this.executeNode.bind(this)}>Execute Node</button>
      </div>`;
    container.appendChild(controls);
  }
  changeNode(n, ...args) {
    // Unload the prev document
    this.activeDocument = undefined;

    // Find document for clicked node
    let doc = _.find(this.documents, {label: n.label});

    // Create a new document for this node if it doesn't exist
    if (doc === undefined) {
      doc = Document(n);
      console.log({doc});
      this.documents.push(doc);
    }

    // Set the editor to be equal to the documents' text contents
    this.editor.setValue(doc.text);
    this.activeDocument = doc;
  }
  executeNode(...args) {
    if (!this.activeDocument) return;
    this.trigger("execute-node", ...[this.activeDocument, ...args]);
  }
  documentModified(...args) {
    // Update the activeDocument everytime it is modified
    if (!this.activeDocument) return;
    this.activeDocument.text = this.editor.getValue();
  }
}

Document = (node) => {
  return _.extend(node, {text: `// Execution script for node with label ${node.label}`})
}

module.exports = NodeEditor;
module.exports.NodeEditor = NodeEditor;
