import React from 'react';
import { useEffect } from 'react';
import { isSignedIn } from '../../actions/api';
import { useRouter } from 'next/router';
import urls from '../../../utils/urls';

export const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();

  const signedIn = async () => {
    const admin = await isSignedIn();
    if (!admin) router.replace(urls.pages.login);
    if (admin) router.replace(urls.pages.add);
  };

  useEffect(() => {
    signedIn();
  }, []);

  return (<WrappedComponent {...props} />);
};

export default withAuth;