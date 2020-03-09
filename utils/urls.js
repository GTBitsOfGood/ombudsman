const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod
    ? 'https://ombudsman-rho.now.sh'
    : 'http://localhost:3000',
  dbName: 'nextjs',
  pages: {
    index: '/',
    search: '/search',
    result: '/result'
  },
  api: {
    example: '/api/getPDF',
    updateClicks: '/api/updateClicks',
    categories: '/api/getCategories',
  },
};
