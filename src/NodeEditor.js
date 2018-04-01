const BaseEditor = require('./BaseEditor');

class NodeEditor extends BaseEditor {
  constructor(container, ...args) {
    super(container, ...args);
  }
  changeNode(...args) {
    console.log("Changing node!", ...args);
  }
}

module.exports = NodeEditor;
module.exports.NodeEditor = NodeEditor;
