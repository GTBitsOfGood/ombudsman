import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import urls from '../../../utils/urls';
import { useCookies } from 'react-cookie';

export const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const [cookies] = useCookies(['admin']);

  const signedIn = async () => {
    if (cookies.admin == 'true') router.push(urls.pages.manage);
    else router.push(urls.pages.login);
  };

  useEffect(() => {
    signedIn();
  }, []);

  return (<WrappedComponent {...props} />);
};

export default withAuth;