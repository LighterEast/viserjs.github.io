import { ViserGraph, registerNode, registerEdge, Layouts} from 'viser-graph';
import { data } from './data';

registerNode('treeNode', {
  anchor: [[0, 0.5], [1, 0.5]]
});

registerEdge('smooth', {
  getPath: function getPath(item) {
    var points = item.getPoints();
    var start = points[0];
    var end = points[points.length - 1];
    var hgap = Math.abs(end.x - start.x);
    if (end.x > start.x) {
      return [['M', start.x, start.y], ['C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y]];
    }
    return [['M', start.x, start.y], ['C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y]];
  }
});

var layout = new Layouts.CompactBoxTree({
  // direction: 'LR', // 方向（LR/RL/H/TB/BT/V）
  getHGap: function getHGap() /* d */ {
    // 横向间距
    return 100;
  },
  getVGap: function getVGap() /* d */ {
    // 竖向间距
    return 10;
  }
});

new ViserGraph({
  graph: {
    container: 'mount',
    width: 500,
    height: 500,
    fitView: 'autoZoom',
    fitViewPadding: true,
    animate: true,
    type: 'tree',
    layout: layout,
  },
  node: {
    shape: 'treeNode',
    size: 8,
    label: function(obj) {
      return obj.name;
    },
  },
  edge: {
    shape: 'smooth'
  },
  data: {
    roots: [data]
  },
  events: {
    onAfterchange: function(ev, graph) {
      console.log('onAfterchange json')
      graph.getNodes().forEach(function(node) {
        var model = node.getModel();
        var label = node.getLabel();
        var keyShape = node.getKeyShape();
        var children = node.getChildren();
        var parent = node.getParent();
        var box = keyShape.getBBox();
        var labelBox = label.getBBox();
        var dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2 + 8;
        var dy = 0;
        if (children.length != 0) {
          dx = -dx;
        }
        label.translate(dx, dy);
      });
      graph.draw();
    }
  },
}).render();
