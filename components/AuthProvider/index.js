import { useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, setAuthInitializing } from 'store/reducers/user';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const authInitializing = useSelector((state) => state.user.authInitializing);

  useEffect(() => {
    const onAuthStateChanged = async (loggedInUser) => {
      if (loggedInUser) {
        dispatch(setAuthInitializing(true));
        // user logging in
        await firebase
          .firestore()
          .collection('users')
          .where('uid', '==', loggedInUser.uid)
          .limit(1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.exists) {
                dispatch(
                  setUser({
                    id: documentSnapshot.id,
                    ...documentSnapshot.data(),
                  }),
                );
              }
            });
            if (authInitializing) {
              dispatch(setAuthInitializing(false));
            }
          });
      } else {
        // User is logging out
        dispatch(setUser(null));
      }
    };
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return children;
}
