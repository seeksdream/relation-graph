import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* Layout */
import Layout from './layout/LeftMenuLayout';

const routesData = [
  // { path: '*', redirect: '/404', hidden: true },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('./views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    meta: { title: '找不到页面', icon: 'excel', affix: true },
    component: () => import('./views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    meta: { title: '没有权限', icon: 'excel', affix: true },
    component: () => import('./views/error-page/401'),
    hidden: true
  },
  {
    path: '/docs/about',
    meta: { title: 'about', icon: 'excel', affix: true },
    component: () => import('./views/seeks-graph-docs/docs/about'),
    hidden: true
  },
  {
    path: '/options-tools',
    meta: { title: 'options-tools', icon: 'excel', affix: true },
    component: () => import('./views/seeks-graph-docs/options-tools'),
    hidden: true
  },
  {
    path: '/demo',
    meta: { title: 'basic', icon: 'excel', affix: true },
    component: () => import('./views/seeks-graph-docs/demo/demo-index'),
    hidden: true,
    redirect: '/demo/simple',
    children: [
      { path: 'simple', component: () => import('./views/seeks-graph-docs/demo/Demo4Logo') },
      { path: 'node', component: () => import('./views/seeks-graph-docs/demo/Demo4Node') },
      { path: 'line', component: () => import('./views/seeks-graph-docs/demo/Demo4Line') },
      { path: 'graph', component: () => import('./views/seeks-graph-docs/demo/Demo4Graph') },
      { path: 'arrow', component: () => import('./views/seeks-graph-docs/demo/Demo4Arrow') },
      { path: 'layout-tree', component: () => import('./views/seeks-graph-docs/demo/Demo4LayoutTree') },
      { path: 'layout-tree2', component: () => import('./views/seeks-graph-docs/demo/Demo4LayoutTree2') },
      { path: 'bothway-tree', component: () => import('./views/seeks-graph-docs/demo/Demo4BothwayTree') },
      { path: 'layout-center', component: () => import('./views/seeks-graph-docs/demo/Demo4LayoutCenter') },
      { path: 'layout-force', component: () => import('./views/seeks-graph-docs/demo/Demo4LayoutForce') },
      { path: 'layout-diy', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneCompany') },
      { path: 'scene-group', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneGroup') },
      { path: 'scene-org', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneOrg') },
      { path: 'scene-company', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneCompany') },
      { path: 'scene-relationship', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneRelationship') },
      { path: 'scene-network', component: () => import('./views/seeks-graph-docs/demo/Demo4SceneNetwork') },
      { path: 'adv-hide-2-show', component: () => import('./views/seeks-graph-docs/demo/Demo4Hide2Show') },
      { path: 'adv-multi-layout', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvMultiLayout') },
      { path: 'adv-slot', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvSlot') },
      { path: 'adv-node-tips', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvNodeTips') },
      { path: 'adv-expand', component: () => import('./views/seeks-graph-docs/demo/Demo4Expand') },
      { path: 'adv-expand-gradually', component: () => import('./views/seeks-graph-docs/demo/Demo4ExpandGradually') },
      { path: 'adv-dynamic-data', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvDynamicData') },
      { path: 'adv-effect', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvEffect') },
      { path: 'graph-resize', component: () => import('./views/seeks-graph-docs/demo/Demo4GraphResize') },
      { path: 'tree-distance', component: () => import('./views/seeks-graph-docs/demo/Demo4TreeDistance') },
      { path: 'tree-data', component: () => import('./views/seeks-graph-docs/demo/Demo4TreeData') },
      { path: 'distance_coefficient', component: () => import('./views/seeks-graph-docs/demo/Demo4CenterDistanceCoefficient') },
      { path: 'adv-data-filter', component: () => import('./views/seeks-graph-docs/demo/Demo4AdvDataFilter') }
    ]
  },
  {
    path: '/docs',
    meta: { title: 'docs-index', icon: 'excel', affix: true },
    component: () => import('./views/seeks-graph-docs/docs-index'),
    hidden: true,
    redirect: '/docs/start',
    children: [
      { path: 'start', component: () => import('./views/seeks-graph-docs/docs/options-start') },
      { path: 'data', component: () => import('./views/seeks-graph-docs/docs/options-data') },
      { path: 'graph', component: () => import('./views/seeks-graph-docs/docs/options-graph') },
      { path: 'node', component: () => import('./views/seeks-graph-docs/docs/options-node') },
      { path: 'link', component: () => import('./views/seeks-graph-docs/docs/options-link') },
      { path: 'layout', component: () => import('./views/seeks-graph-docs/docs/options-layout') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '总览',
    redirect: '/docs/start'
  }
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/sigup',
  //   component: () => import('@/views/login/sigup'),
  //   hidden: true
  // },
  // {
  //   path: '/resetpassword',
  //   component: () => import('@/views/login/resetpassword'),
  //   hidden: true
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // }
];

const initRoutes = (routes) => {
  routes.forEach(thisRoute => {
    thisRoute.filtered = false;
    thisRoute.visiableChildCount = 1;
    if (thisRoute.children) {
      initRoutes(thisRoute.children);
    }
  });
};
initRoutes(routesData);

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routesData
});

const router = createRouter();
export default router;
