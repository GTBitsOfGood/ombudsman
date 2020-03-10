import urls from './urls';

const routes = [
  {
    name: 'Home',
    link: urls.pages.index,
  },
  {
    name: 'Search',
    link: urls.pages.search,
  },
  {
    name: 'Render PDF',
    link: urls.pages.pdf,
  },
];

export default routes;
