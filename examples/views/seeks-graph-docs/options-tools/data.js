
const graph_options = { 'backgrounImage': 'https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f', 'backgrounImageNoRepeat': true };
// eslint-disable-next-line no-unused-vars
const _graph_options2 = {
  backgrounImage: 'https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f',
  backgrounImageNoRepeat: true,
  showSettingPanel: false,
  debug: true,
  isShowMiniView: true,
  defaultExpandHolderPosition: 'hide',
  allowSwitchLineShape: true,
  allowAutoLayoutIfSupport: true,
  layouts: [
    {
      label: '上下',
      layoutName: 'tree',
      layoutClassName: 'seeks-layout-tree-top',
      layoutDirection: 'v',
      defaultExpandHolderPosition: 'hide',
      defaultNodeShape: 1,
      defaultLineShape: 2,
      defaultLineColor: '#FD8B37',
      defaultNodeColor: '#0AA8F7',
      defaultNodeBorderColor: '#FD8B37',
      defaultNodeFontColor: '#ffffff',
      defaultNodeWidth: 200,
      defaultNodeHeight: 50,
      defaultJunctionPoint: 'tb',
      from: 'top', centerOffset_x: 0, centerOffset_y: 0, levelDistance: '', min_per_width: 30, max_per_width: 200, min_per_height: 160, max_per_height: 500
    },
    {
      label: '左右',
      layoutName: 'tree',
      layoutClassName: 'seeks-layout-tree-left',
      layoutDirection: 'h',
      defaultExpandHolderPosition: 'right',
      defaultNodeShape: 1,
      defaultLineShape: 2,
      defaultJunctionPoint: 'lr',
      from: 'left', min_per_width: 200, max_per_width: 800, min_per_height: 30, max_per_height: 200
    },
    {
      label: '中心',
      layoutName: 'center',
      layoutClassName: 'seeks-layout-center',
      layoutDirection: 'v',
      defaultNodeShape: 0,
      defaultLineShape: 1,
      defaultNodeWidth: 150,
      defaultNodeHeight: 150,
      defaultJunctionPoint: 'border',
      levelDistance: ''
    }
  ],
  defaultLineShape: 2,
  defaultNodeShape: 1
};
const graph_data = {
  'rootId': 'a',
  'nodes': [
    { 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' },
    { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' },
    { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' },
    { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' },
    { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' },
    { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' },
    { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' },
    { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' },
    { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' },
    { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' },
    { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' },
    { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' },
    { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }
  ],
  'lines': [
    { 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' },
    { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' },
    { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' },
    { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' },
    { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' },
    { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' },
    { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' },
    { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' },
    { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' },
    { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' },
    { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' },
    { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' },
    {
      'from': 'd',
      'to': 'd3',
      'text': 'Link2',
      'color': 'rgba(255, 120, 0, 1)',
      'lineWidth': 1,
      'data': {}
    },
    {
      'from': 'd3',
      'to': 'd',
      'text': 'Link3',
      'color': 'rgba(0, 206, 209, 1)',
      'isReverse': true,
      'lineWidth': 1,
      'lineShape': 1,
      'data': {}
    },
    {
      'from': 'd3',
      'to': 'd',
      'text': 'Link3',
      'color': 'rgba(144, 240, 144, 0.5)',
      'isHideArrow': true,
      'lineWidth': 5,
      'lineShape': 3,
      'data': {}
    }
  ]
};
const graph_data2 = {
  'rootId': 'a',
  'nodes': [
    { 'id': 'a', 'text': 'a' },
    { 'id': 'b', 'text': 'b' },
    { 'id': 'b1', 'text': 'b1' },
    { 'id': 'b2', 'text': 'b2' },
    { 'id': 'b3', 'text': 'b3' },
    { 'id': 'b4', 'text': 'b4' },
    { 'id': 'b5', 'text': 'b5' },
    { 'id': 'b6', 'text': 'b6' },
    { 'id': 'c', 'text': 'c' },
    { 'id': 'c1', 'text': 'c1' },
    { 'id': 'c2', 'text': 'c2' },
    { 'id': 'c3', 'text': 'c3' },
    { 'id': 'd', 'text': 'd' },
    { 'id': 'd1', 'text': 'd1' },
    { 'id': 'd2', 'text': 'd2' },
    { 'id': 'd3', 'text': 'd3' },
    { 'id': 'd4', 'text': 'd4' },
    { 'id': 'e', 'text': 'e' },
    { 'id': 'e1', 'text': 'e1' },
    { 'id': 'e2', 'text': 'e2' }
  ],
  'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'd', 'to': 'd3', 'text': 'Link2', 'color': 'rgba(255, 120, 0, 1)', 'lineWidth': 1, 'data': {}}, { 'from': 'd3', 'to': 'd', 'text': 'Link3', 'color': 'rgba(0, 206, 209, 1)', 'isReverse': true, 'lineWidth': 1, 'lineShape': 1, 'data': {}}, { 'from': 'd3', 'to': 'd', 'text': 'Link3', 'color': 'rgba(144, 240, 144, 0.5)', 'isHideArrow': true, 'lineWidth': 5, 'lineShape': 3, 'data': {}}]
};
const graph_data3 = {
  'rootId': 'a',
  'nodes': [
    { 'id': 'a', 'text': 'a' },
    { 'id': 'b', 'text': 'b' },
    { 'id': 'c', 'text': 'c' },
    { 'id': 'd', 'text': 'd' },
    { 'id': 'e', 'text': 'e' },
    { 'id': 'f', 'text': 'f' }
  ],
  'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'a', 'to': 'c' }, { 'from': 'a', 'to': 'd' }, { 'from': 'a', 'to': 'e' }, { 'from': 'a', 'to': 'f' }]
};
const person = [
  { 'id': 'N1', 'text': '侯亮平', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014' },
  { 'id': 'N2', 'text': '李达康', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062' },
  { 'id': 'N3', 'text': '祁同伟', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092' },
  { 'id': 'N4', 'text': '陈岩石', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021' },
  { 'id': 'N5', 'text': '陆亦可', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060' },
  { 'id': 'N6', 'text': '高育良', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1' },
  { 'id': 'N7', 'text': '沙瑞金', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1' },
  { 'id': 'N8', 'text': '高小琴', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011' },
  { 'id': 'N9', 'text': '高小凤', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012' },
  { 'id': 'N10', 'text': '赵东来', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013' },
  { 'id': 'N11', 'text': '程度', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3' },
  { 'id': 'N12', 'text': '吴惠芬', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081' },
  { 'id': 'N13', 'text': '赵瑞龙', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080' },
  { 'id': 'N14', 'text': '赵立春', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C' },
  { 'id': 'N15', 'text': '陈海', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0' },
  { 'id': 'N16', 'text': '梁璐', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2' },
  { 'id': 'N17', 'text': '刘新建', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082' },
  { 'id': 'N18', 'text': '欧阳菁', 'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091' },
  { 'id': 'N19', 'text': '吴心怡', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C' },
  { 'id': 'N20', 'text': '蔡成功', 'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1' },
  { 'id': 'N21', 'text': '丁义珍', 'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093' }
];
const icons = [
  { id: '1', name: '节点-1', data: { myicon: 'el-icon-star-on' }},
  { id: '2', name: '节点-2', data: { myicon: 'el-icon-setting' }},
  { id: '3', name: '节点-3', data: { myicon: 'el-icon-setting' }},
  { id: '4', name: '节点-4', data: { myicon: 'el-icon-star-on' }},
  { id: '6', name: '节点-6', data: { myicon: 'el-icon-setting' }},
  { id: '7', name: '节点-7', data: { myicon: 'el-icon-setting' }},
  { id: '8', name: '节点-8', data: { myicon: 'el-icon-star-on' }},
  { id: '9', name: '节点-9', data: { myicon: 'el-icon-headset' }},
  { id: '71', name: '节点-71', data: { myicon: 'el-icon-headset' }},
  { id: '72', name: '节点-72', data: { myicon: 'el-icon-s-tools' }},
  { id: '73', name: '节点-73', data: { myicon: 'el-icon-star-on' }},
  { id: '81', name: '节点-81', data: { myicon: 'el-icon-s-promotion' }},
  { id: '82', name: '节点-82', data: { myicon: 'el-icon-s-promotion' }},
  { id: '83', name: '节点-83', data: { myicon: 'el-icon-star-on' }},
  { id: '84', name: '节点-84', data: { myicon: 'el-icon-s-promotion' }},
  { id: '85', name: '节点-85', data: { myicon: 'el-icon-sunny' }}
];
const appendPersonData = (nodes) => {
  nodes.forEach((node, index) => {
    node.data = {};
    const picIndex = index % (person.length - 1);
    node.data.pic = person[picIndex].pic;
    node.data.name = person[picIndex].text;
  });
};
const appendIconData = (nodes) => {
  nodes.forEach((node, index) => {
    const picIndex = index % (icons.length - 1);
    node.data.myicon = icons[picIndex].data.myicon;
  });
};
appendPersonData(graph_data.nodes);
appendIconData(graph_data.nodes);
appendPersonData(graph_data2.nodes);
appendIconData(graph_data2.nodes);
appendPersonData(graph_data3.nodes);
appendIconData(graph_data3.nodes);

// const xx2 = graph_data2.lines.filter(line => {
//   return line.from.indexOf('-') === -1 && line.to.indexOf('-') === -1;
// });
// console.log(JSON.stringify(xx2));
// const xx3 = graph_data2.lines.filter(line => {
//   return line.from.length === 1 && line.to.length === 1;
// });
// console.log(JSON.stringify(xx3));
export const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
];
export const predefineColorsBorder = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsl(181, 100%, 37%)',
  '#c7158577'
];
export const getGraphOptions = () => {
  return JSON.stringify(graph_options, null, 2);
};
export const getGraphData = () => {
  return JSON.stringify(graph_data2, null, 2);
};
export const getGraphTeamplateData = (dataIndex) => {
  if (dataIndex === 1) {
    return JSON.stringify(graph_data, null, 2);
  } else if (dataIndex === 2) {
    return JSON.stringify(graph_data2, null, 2);
  } else if (dataIndex === 3) {
    return JSON.stringify(graph_data3, null, 2);
  }
};
