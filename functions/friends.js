import * as firebase from 'firebase';
import 'firebase/firestore';

export const getUsersFriendRequests = async (userId) => {
  const requests = [];
  await firebase
    .firestore()
    .collection('friendRequests')
    .where('requestTo', '==', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        const req = documentSnapshot.data();
        requests.push({ id: documentSnapshot.id, ...req });
      });
    });
  return requests;
};

export const findFriendRequest = async (requestTo, requestFrom) => {
  let friendRequest;
  await firebase
    .firestore()
    .collection('friendRequests')
    .where('requestTo', '==', requestTo)
    .where('requestFrom', '==', requestFrom)
    .limit(1)
    .get()
    .then((requestSnapshot) => {
      requestSnapshot.forEach((request) => {
        const req = request.data();
        friendRequest = { id: request.id, ...req };
      });
    });
  return friendRequest;
};

export const createFriendRequest = async (requestTo, requestFrom) => {
  const friendRequestData = {
    requestTo: requestTo.uid,
    requestToName: requestTo.displayName,
    requestToId: requestTo.id,
    requestFrom: requestFrom.uid,
    requestFromName: requestFrom.displayName,
    requestFromId: requestFrom.id,
    createdDate: Date.now(),
  };

  return await firebase
    .firestore()
    .collection('friendRequests')
    .add({
      ...friendRequestData,
    })
    .then((docRef) => {
      return {
        id: docRef.id,
        ...friendRequestData,
      };
    });
};

export const deleteFriendRequest = async (requestId) => {
  await firebase
    .firestore()
    .collection('friendRequests')
    .doc(requestId)
    .delete();
};

export const addFriend = async (user1, user2) => {
  const profileReference = firebase.firestore().doc(`users/${user1.id}`);
  firebase.firestore().runTransaction(async (transaction) => {
    const profileSnapshot = await transaction.get(profileReference);
    await transaction.update(profileReference, {
      friends: [
        ...profileSnapshot.data().friends,
        {
          uid: user2.uid,
          displayName: user2.displayName,
        },
      ],
    });
  });

  const userReference = firebase.firestore().doc(`users/${user2.id}`);
  firebase.firestore().runTransaction(async (transaction) => {
    const userSnapshot = await transaction.get(userReference);
    await transaction.update(userReference, {
      friends: [
        ...userSnapshot.data().friends,
        {
          uid: user1.uid,
          displayName: user1.displayName,
        },
      ],
    });
  });
};

export const removeFriend = async (user1, user2) => {
  const profileReference = firebase.firestore().doc(`users/${user1.id}`);
  firebase.firestore().runTransaction(async (transaction) => {
    const profileSnapshot = await transaction.get(profileReference);
    await transaction.update(profileReference, {
      friends: [
        ...profileSnapshot
          .data()
          .friends.filter((friend) => friend.uid !== user2.uid),
      ],
    });
  });

  const userReference = firebase.firestore().doc(`users/${user2.id}`);
  firebase.firestore().runTransaction(async (transaction) => {
    const userSnapshot = await transaction.get(userReference);
    await transaction.update(userReference, {
      friends: [
        ...userSnapshot
          .data()
          .friends.filter((friend) => friend.uid !== user1.uid),
      ],
    });
  });
};
