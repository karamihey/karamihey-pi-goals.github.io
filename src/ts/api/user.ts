// api
import { sendPostRequest, sendGetRequest } from 'api/requests';
// types
import { NewUser } from 'types/user';

export const createUser = ({ email, password }: NewUser) => sendPostRequest('/users/create', {
  email, password,
});

export const getUsers = () => sendGetRequest('/users');

export const getUser = (id: number) => sendGetRequest(`/users/${id}`);
