import { useContext, useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from 'context';

export default function AuthProvider({ children }) {
  const { setAuthInitializing, setUser } = useContext(AppContext);

  useEffect(() => {
    const onAuthStateChanged = async (loggedInUser) => {
      if (loggedInUser) {
        // user logging in
        setAuthInitializing(true);
        await firebase
          .firestore()
          .collection('users')
          .where('uid', '==', loggedInUser.uid)
          .limit(1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.exists) {
                setUser({
                  id: documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
              }
            });
          });
        setAuthInitializing(false);
      } else {
        // user logging out
        setUser(null);
      }
    };
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [setAuthInitializing, setUser]);
  return children;
}
