import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViserGraphModule, GlobalG6 as G6 } from 'viser-graph-ng';

G6.registerNode('justPoints', {
  draw(cfg, group) {

    const baseR = 30;
    let nowAngle = 0;

    // Ref line
    let refR = baseR;
    const refInc = 10;
    for (let i = 0; i < 5; i++) {
      group.addShape('circle', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          r: refR += refInc,
          stroke: '#5ad8a6',
          lineDash: [ 4, 4 ]

        }
      });
    }
    const everyIncAngle = 2 * Math.PI * (360 / 5 / 5) / 360;
    nowAngle = nowAngle + everyIncAngle / 2;
    cfg.details.forEach(cat => {
      // 计算一系列点的位置
      const postions = [];
      cat.values.forEach((item, index) => {
        const r = baseR + item;
        const xPos = r * Math.cos(nowAngle);
        const yPos = r * Math.sin(nowAngle);
        nowAngle += everyIncAngle;
        postions.push([ xPos, yPos ]);
        if (index === 4) {
          const r = baseR + item;
          const xPos = r * Math.cos(nowAngle);
          const yPos = r * Math.sin(nowAngle);
          postions.push([ xPos, yPos ]);
        }
      });

      // 添加标注点
      postions.forEach((pos, index) => {
        if (index !== 5) {
          group.addShape('circle', {
                // attrs: style
            attrs: {
              x: pos[0], // 居中
              y: pos[1],
              r: 3,
              // fill: 'black',
              lineWidth: 2,
              stroke: cat.color
            }
          });
        }
      });
    });

    let nowAngle2 = 0;
    const everyIncAngleCat = 2 * Math.PI * (360 / 5) / 360;
    for (let i = 0; i < 5; i++) {
      const r = 30 + 50;
      const xPos = r * Math.cos(nowAngle2);
      const yPos = r * Math.sin(nowAngle2);

      group.addShape('path', {
        attrs: {
          path: [
                [ 'M', 0, 0 ],
                [ 'L', xPos, yPos ]
          ],
          lineDash: [ 4, 4 ],

          stroke: '#5ad8a6' // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
        }
      });
      nowAngle2 += everyIncAngleCat;
    }
    // 添加一个和背景色相同的圆形
    group.addShape('circle', {
          // attrs: style
      attrs: {
        x: 0, // 居中
        y: 0,
        r: baseR,
        fill: cfg.centerColor,
        stroke: 'darkgray'
      }
    });

    if (cfg.label) {
      group.addShape('text', {
            // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#fff',
          fontStyle: 'bold'
        }
      });
    }
    return group;
  }
});

const data = {
  nodes: [
    {
      id: 'nodeC',
      x: 150,
      y: 150,
      label: 'Point2',
      shape: 'justPoints',
      anchorPoints: [
          [ 0, 0.5 ], [ 1, 0.5 ]
      ],
      details: [
        { cat: 'pv', values: [ 20, 30, 40, 30, 30 ], color: '#5B8FF9' },
        { cat: 'dal', values: [ 40, 30, 20, 30, 50 ], color: '#5AD8A6' },
        { cat: 'uv', values: [ 40, 30, 30, 40, 40 ], color: '#5D7092' },
        { cat: 'sal', values: [ 20, 30, 50, 20, 20 ], color: '#F6BD16' },
        { cat: 'cal', values: [ 10, 10, 20, 20, 20 ], color: '#E8684A' }
      ],
      centerColor: '#5b8ff9'
    }, {
      id: 'nodeC2',
      x: 500,
      y: 150,
      label: 'Point2',
      shape: 'justPoints',
      anchorPoints: [
          [ 0, 0.5 ], [ 1, 0.5 ]
      ],
      details: [
        { cat: 'pv', values: [ 10, 10, 50, 20, 10 ], color: '#5ad8a6' },
        { cat: 'dal', values: [ 20, 30, 10, 50, 40 ], color: '#ff99c3' },
        { cat: 'uv', values: [ 10, 50, 30, 20, 30 ], color: '#6dc8ec' },
        { cat: 'sal', values: [ 50, 30, 20, 20, 20 ], color: '#269a99' },
        { cat: 'cal', values: [ 50, 10, 20, 50, 30 ], color: '#9270CA' }
      ],
      centerColor: '#5b8ff9'
    }
  ],
  edges: [
    {
      source: 'nodeC',
      target: 'nodeC2'
    }
  ]
};

const graph = {
  data,
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-graph [width]="graph.width" [height]="graph.height" [data]="graph.data">
    </v-graph>
  </div>
  `
})

class AppComponent {
  data = data;
  graph = graph;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserGraphModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export default class AppModule {}
