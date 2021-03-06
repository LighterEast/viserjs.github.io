# Viser-graph 组件 api

## Graph

#### type

可选 tree （树状关系图）或者 graph （网状关系图）， 默认 graph。最简单的示例如下：

```javascript
const graph = {
  type: 'graph',
  width: 500,
  height: 500,
  fitView: 'cc',
  fitViewPadding: true,
  animate: true,
  minZoom: 0.2,
  maxZoom: 10,
  data,
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph} />
      </div>
    );
  }
}
```

#### data {object} 数据模型 必选

格式：
type 为 graph 、 tree 的数据格式是不一样的。

```javascript
// type === graph
{
  nodes:[],
  edges:[],
  groups: [],
}
// type === tree
{
  roots:[]
}
```

nodes：节点的数据模型

```javascript
{
  id: 'node1',             // id 必须唯一
  x: number,            // 横向位置
  y: number,           // 纵向位置
  color: '#333',           // 颜色
  size: 10 || [10, 10],    // 尺寸 || [宽, 高]
  shape: 'circle',         // 所用图形（目前只测验了circle可用）
  style: {                 // 关键形样式（优先级高于color）
    fill: 'red',
	  stroke: 'blue'
  },
  label: '文本标签' || {     // 文本标签 || 文本图形配置
    text: '文本标签',
	  fill: 'green'
  },
  parent: 'group1',         // 所属组
  index: 1,                 // 渲染层级（暂未测试）
}
```

edges：边的数据模型

```javascript
{
  id: 'edge1',           // id 必须唯一
  source: 'node1',       // 源节点 id
  target: 'node2',       // 目标节点 id
  controlPoints: [{      // 控制点
    x: 10,
	  y: 10
  }],
  sourceAnchor: 0,       // 源节点锚点（以上锚点测试为填写后将不会与其他点连接，具体作用未知）
  targetAnchor: 2,       // 目标节点锚点（以上锚点测试为填写后将不会与其他点连接，具体作用未知）
  color: 'red',          // 颜色
  size: 3,               // 尺寸
  shape: 'line',         // 所用图形（目前只测验了line可用）, 引入插件-二阶贝塞尔曲线 ， 可使用shape: quadraticCurve
  style: {               // 关键形样式（优先级高于color）
	  stroke: 'blue'
  },
  label: '文本标签' || {   // 文本标签 || 文本图形配置
    text: '文本标签',
	  fill: 'green'
  },
  parent: 'group1',       // 所属组
  index: 1,               // 渲染层级
}
```

groups：群组的数据模型

```javascript
{
  id: 'group1',             // id 必须唯一
  color: '#333',           // 颜色
  size: 10 || [10, 10],    // 尺寸 || [宽, 高], 参数不可用
  shape: 'circle',         // 所用图形, 参数不可用
  style: {                 // 关键形样式（优先级高于color）
    fill: 'red',
	  stroke: 'blue'
  },
  label: '文本标签' || {     // 文本标签 || 文本图形配置
    text: '文本标签',
	  fill: 'green'
  },
  parent: 'group2',         // 所属组
  index: 1,                 // 渲染层级
}
```

roots: type 为 tree 时, data 数据模型

```javascript
[
  {
    id: 'root', // 根节点 id
    color: '#333', // 颜色
    size: 10 || [10, 10], // 尺寸 || [宽, 高]
    shape: 'circle', //  所用图形
    style: {
      // 样式 (优先级高于 color)
      fill: 'red',
      stroke: 'blue',
    },
    label: '文本标签' || {
      // 文本标签 || 文本图形配置
      text: '文本标签',
      fill: 'green',
    },
    parent: 'parentId', // 父节点 id
    collapsed: false, // 是否折叠 默认false
    index: 1, // 渲染层级
    children: [
      {
        // 子元素集 （自元素数据模型和根节点同构）
        id: 'leaf',
      },
    ],
  },
];
```

#### container

需传入 dom 容器或者容器 id {domObject || string}  必选

#### width

画布宽，单位像素 {number}  可选

#### height

画布宽，单位像素 {number}  可选

#### fitview

初始化视口区域  {string}  可选
候选值为： 'tl', 'lc', 'bl', 'cc', 'tc', 'tr', 'rc', 'br', 'bc', 'autoZoom'

<img src="//cdn.nlark.com/lark/0/2018/png/124533/1532954651334-8286b350-7e04-4b56-84ec-fc0182e1bf32.png" width="300px"/>

#### fitViewPadding

视口适应画布边距 {boolean | number | number[]}  可选
<img src="//cdn.nlark.com/lark/0/2018/png/1140/1533632218107-1822dab0-9499-41cb-8fb4-cfb4843637ec.png" width="300px"/>

#### animate

是否开启动画 {boolean} 默认 false

#### minZoom

最小缩放倍率 {number} 默认为 0.2

#### maxZoom

最大缩放倍率 {number} 默认为 10

#### plugins

插件集 {array} 用于扩展 layout 或者映射关系，示例如下

```
// 插件-布局-阿基米德螺线
var Plugin = G6.Plugins["layout.circle"];
// 插件-布局-圆形
var Plugin = G6.Plugins["layout.archimeddeanSpiral"];
// 插件-模版-最大生成森林
var Plugin = G6.Plugins["template.maxSpanningForest"];
// 插件-缩略图
var Plugin = G6.Plugins["tool.minimap"];
var plugin = new Plugin({
  container: 'minimap',
  width: 180,
  height: 120
});

var graph = new G6.Graph({
  container: 'mountNode',
  fitView: 'cc',
  height: window.innerHeight,
  plugins: [new Plugin()]
});
```

#### layout

布局参数 {object|function}
详见方法中的 layouts

#### 事件

```javascript
const graph = {
  type: 'graph',
  data,
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
  },
};
```

```
  onClick?: func; 鼠标单击
  onAfterchange?: func; 数据改变后
  onMousedown?: func; 鼠标按下
  onMousemove?: func; 鼠标移动
  onMouseleave?: func; 鼠标离开画布区域
  onMouseup?: func; 鼠标抬起
  onDblclick?: func; 鼠标双击
  onTouchstart?: func; 手指触摸
  onTouchmove?: func; 手指移动
  onTouchend?: func; 手指离开
  onPlotenter?: func; 进入图表时
  onPlotmove?: func; 在图表上移动时
  onPlotleave?: func; 从图表离开时
  onPlotclick?: func; 单击图表时
  onPlotdblclick?: func; 双击图表时
  onDragstart?: func; 开始拖动时
  onDrag?: func; 拖动中
  onDragend?: func; 拖动结束时
```

#### 事件回调函数参数

ev: dom 节点相关信息
graph: 配置参数相关信息

### zoom 画布缩放

#### min?: number;

最小缩放比率

#### max?: number;

最大缩放比率

#### current?: number;

当前缩放比率

```javascript
const zoom = {
  max: 10,
  min: 1,
  current: 2,
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Zoom {...zoom} />
        </Graph>
      </div>
    );
  }
}
```

### Node

#### shape?: string;

节点形状

#### size?: number;

节点大小

#### label?: (obj: any) => {};

节点文本

#### style?: any;

节点样式

```javascript
const node = {
  shape: 'treeNode',
  size: 8,
  label: function(obj) {
    return obj.name;
  },
  style: {
    fill: 'red',
    stroke: 'blue',
  },
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Node {...node} />
        </Graph>
      </div>
    );
  }
}
```

### Edge

#### shape?: string;边形状

#### style?: any;边样式

```javascript
const edge = {
  shape: 'smooth',
  style: {
    stroke: 'blue',
  },
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Graph {...graph}>
          <Edge {...Edge} />
        </Graph>
      </div>
    );
  }
}
```

详细可见： https://antv.alipay.com/zh-cn/g6/1.x/api/graph.html
