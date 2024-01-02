const tree: AuthRoute.Route = {
  name: 'tree',
  path: '/tree',
  component: 'basic',
  meta: { title: 'tree', icon: 'mdi:family-tree' },
  children: [
    {
      name: 'tree_binaryTree',
      path: '/tree/binaryTree',
      component: 'self',
      meta: { title: 'tree_binaryTree', icon: 'mdi:family-tree', hide: true }
    }
  ]
};

export default tree;
