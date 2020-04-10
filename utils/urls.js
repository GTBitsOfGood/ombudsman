const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod
    ? 'https://ombudsman-dev.now.sh'
    : 'http://localhost:3000',
  dbName: 'nextjs',
  pages: {
    index: '/',
    search: '/search',
    result: '/result',
    help: '/help',
    login: '/login',
    add: '/add'
  },
  api: {
    getPDF: '/api/getPDF',
    updateClicks: '/api/updateClicks',
    authenticate: '/api/authenticate',
    signOut: '/api/signOut',
    uploadDocument: '/api/uploadDocument',
    isSignedIn: '/api/isSignedIn'
  },
};
