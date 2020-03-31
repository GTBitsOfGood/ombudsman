const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod
    ? 'https://ombudsman-rho.now.sh'
    : 'http://localhost:3000',
  dbName: 'nextjs',
  pages: {
    index: '/',
    search: '/search',
    result: '/result',
    help: '/help',
    login: '/login',
  },
  api: {
    getPDF: '/api/getPDF',
    updateClicks: '/api/updateClicks',
    categories: '/api/getCategories',
  },
};
