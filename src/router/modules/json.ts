const multiMenu: AuthRoute.Route = {
  name: 'json',
  path: '/json',
  component: 'basic',
	redirect: '/json/format',
  children: [
    {
      name: 'json_format',
      path: '/json/format',
      component: 'self',
      children: [
      ],
      meta: {
        title: 'JSON Format',
				multiTab: true,
        icon: 'mdi:code-json',
				hide: true
      }
    }
  ],
  meta: {
    title: 'JSON',
    icon: 'mdi:code-json',
    order: 8
  }
};

export default multiMenu;
