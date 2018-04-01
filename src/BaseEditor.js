const ace = require('ace-builds');
const backbone = require('backbone');
const yo = require('yo-yo');
const _ = require('lodash');

class BaseEditor {
  constructor(container) {
    console.log("Hello World!");
    _.extend(this, backbone.Events);
    const editorContainer = yo`<div style="${this.Styles.editor}"></div>`;
    container.appendChild(editorContainer);
    var editor = ace.edit(editorContainer, {mode: "ace/mode/javascript"});
    this.editor = editor;
    this.container = container;
  }
  get Styles() {
    return {
      editor: `
        position: relative;
        height: 100%;
        width: 100%;
      `,
      controls: `
        position: fixed;
        bottom: 0;
        background: #e4e0e0;
        width: 100%;
        z-index: 9;
        padding: 5px;
      `
    }
  }
}

module.exports = BaseEditor;
module.exports.BaseEditor = BaseEditor;
