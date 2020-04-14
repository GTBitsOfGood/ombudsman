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
    name: 'Result',
    link: urls.pages.result,
  },
  {
    name: 'Help',
    link: urls.pages.help,
  },
  {
    name: 'Login',
    link: urls.pages.login,
  },
  {
    name: 'Manage',
    link: urls.pages.manage,
  },
  {
    name: 'Add',
    link: urls.pages.add,
  },
];

export default routes;
