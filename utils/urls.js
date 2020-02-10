const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod
    ? 'https://https://ombudsman.now.sh'
    : 'http://localhost:3000',
  dbName: 'nextjs',
  pages: {
    index: '/',
    ssr: '/ssr',
  },
  api: {
    example: '/api/getPDF',
  },
};
