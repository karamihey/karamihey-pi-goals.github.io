// api
import { sendGetRequest } from 'api/requests';

export const getUser = () => sendGetRequest('user');
