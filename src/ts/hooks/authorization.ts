// libraries
import { useState } from 'react';
// types
import { NewUser } from 'types/user';
// constants
import LOCAL_STORAGE_NAMES from 'constants/storageKeys';
import { DEFAULT_ERROR } from 'constants/errors';
// api
import { createUser } from 'api/user';
// utils
import { setItem, getItem, removeItem } from 'utils/localStorage';
import { addErrorToast } from 'utils/toast';

const useAuth = () => {
  const [user, setUser] = useState({});

  const signIn = ({ email, password }: NewUser) => {
    console.error('signIn', email, password);
    setItem(LOCAL_STORAGE_NAMES.authToken, '123');
    setUser({});
  };

  const signUp = async ({ email, password }: NewUser) => {
    try {
      await createUser({ email, password });
      signIn({ email, password });
    } catch (error) {
      addErrorToast(DEFAULT_ERROR);
    }
  };

  const signOut = () => {
    removeItem(LOCAL_STORAGE_NAMES.authToken);
    setUser({});
  };

  const isUserLoggedIn = () => getItem(LOCAL_STORAGE_NAMES.authToken);

  return {
    user,
    isUserLoggedIn,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
