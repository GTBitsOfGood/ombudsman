import React, {useState} from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import urls from '../../../utils/urls';
import { useCookies } from 'react-cookie';
import Loading from '../Loading/Loading';

export const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const [cookies] = useCookies(['admin']);
  const [loading, setLoading] = useState(true);

  const signedIn = async () => {
    if (cookies.admin == 'true') {
      if (router.pathname == urls.pages.login) router.push(urls.pages.manage);
    }
    else router.push(urls.pages.login);
  };

  useEffect(() => {
    setLoading(true);
    signedIn();
    setLoading(false);
  }, []);

  return ( loading ? (<Loading/>) : (<WrappedComponent {...props} />))
  ;
};

export default withAuth;