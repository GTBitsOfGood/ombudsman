import React from 'react';
import { useEffect } from 'react';
import { isSignedIn } from '../../actions/api';
import { useRouter } from 'next/router';
import urls from '../../../utils/urls';

export const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();

  const signedIn = async () => {
    const admin = await isSignedIn();
    if (!admin) router.push(urls.pages.login);
  };

  useEffect(() => {
    signedIn();
  }, []);

  return (<WrappedComponent {...props} />);
};

export default withAuth;