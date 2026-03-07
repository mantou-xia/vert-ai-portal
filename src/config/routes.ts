export const routes = {
  home: '/',
  products: '/products',
  maas: '/maas',
  about: '/about',
  fde: '/fde',
} as const;

export type RouteKey = keyof typeof routes;
