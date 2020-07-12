import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'https://swapi.dev/api/';

export function checkLoginUser(value){
  return fetch(API_BASE_ADDRESS+"people/?search="+value)
    .then(handleResponse)
    .catch(handleError);
}
