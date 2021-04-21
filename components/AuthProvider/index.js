import { useContext, useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from 'context';

export default function AuthProvider({ children }) {
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const onAuthStateChanged = (loggedInUser) => {
      if (loggedInUser) {
        // user logging in
        firebase
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
      } else {
        // user logging out
        setUser(null);
      }
    };
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [setUser]);
  return children;
}
