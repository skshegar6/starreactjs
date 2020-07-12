import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'https://swapi.dev/api/planets';

export function getPlanets(){
  return fetch(API_BASE_ADDRESS)
    .then(handleResponse)
    .catch(handleError);
}

export function getRemaningPlanets(page_no){
  return fetch(API_BASE_ADDRESS+'?page='+page_no)
    .then(handleResponse)
    .catch(handleError);
}
