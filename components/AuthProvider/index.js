import { useContext, useEffect } from 'react';
import * as firebase from 'firebase';

import { AppContext } from 'context';

export default function AuthProvider({ children }) {
  const { authInitializing, user, setUser } = useContext(AppContext);

  useEffect(() => {
    const onAuthStateChanged = (loggedInUser) => {
      if (loggedInUser) {
        // User is logging in, will use this to get user record and store in context
        setUser({ name: 'Matthew' });
      } else {
        // User is logging out, will use this to clear user in context
        setUser(null);
      }
    };
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return children;
}
