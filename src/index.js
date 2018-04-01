require('golden-layout/src/css/goldenlayout-base.css');
require('golden-layout/src/css/goldenlayout-light-theme.css');
const GoldenLayout = require('golden-layout');
const yo = require('yo-yo');

const ComputationalGraph = require('./ComputationalGraph');
const GraphEditor = require('./GraphEditor');
const NodeEditor = require('./NodeEditor');

const init = (element) => {
  if (element == undefined) element = document.body;

  var config = {
      content: [{
          type: 'row',
          content:[{
              type: 'component',
              componentName: 'graph',
              componentState: { label: 'A' }
          },{
              type: 'stack',
              content: [{
                type: 'component',
                componentName: 'graph-editor',
                componentState: { label: 'B' }
              },
              {
                type: 'component',
                componentName: 'node-editor',
                componentState: { label: 'C' }
              }]
          }]
      }]
  };


  const _this = this; //XXX: myLayout.registerComponent requires localScoped "this"
  var myLayout = new GoldenLayout( config );

  myLayout.registerComponent( 'graph', function ( container, componentState ) {
      container.getElement().html('<div></div>');
      let graphElement = container.getElement()[0];
      _this.graph = new ComputationalGraph(graphElement);
      _this.graph.on("node-clicked", (...args) => {
        _this.nodeEditor.changeNode(...args);
      });
  });

  myLayout.registerComponent( 'graph-editor', function ( container, componentState ) {
    container.getElement().html(`<div style="${Styles.editor}"></div>`);
    let graphEditorElement = container.getElement()[0];
    _this.graphEditor = new GraphEditor(graphEditorElement);
    _this.graphEditor.on("rebuild-graph", (...args) => {
      _this.graph.buildFromText(...args);
    });
  });

  myLayout.registerComponent( 'node-editor', function ( container, componentState ) {
    container.getElement().html(`<div style="${Styles.editor}"></div>`);
    let nodeEditorElement = container.getElement()[0];
    _this.nodeEditor = new NodeEditor(nodeEditorElement);
    _this.nodeEditor.on("execute-node", (...args) => {
      _this.graph.executeNode(...args);
    })
  });

  myLayout.init();

  console.log({myLayout});
}

const Styles = {
  editor: `
    top: 0px;
    right: 0px;
    position: absolute;
    height: 100%;
    width: 500px;
    padding-bottom:20px;
  `
};

module.exports = init;
module.exports.init = init;
