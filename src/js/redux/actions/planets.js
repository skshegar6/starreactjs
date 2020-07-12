import * as planetsApi from '../api/planetsApi.js';

export function loadPlanetsInServer(){
  return function (dispatch){
    return planetsApi.getPlanets().then(planets =>{
      if(planets.count > 10){
        loadRemainingPlanetsInServer(dispatch,41)
      }
      dispatch({ type: 'LOAD_PlANETS', planets })     
    }).catch(error =>{
      throw error;
    })
  }
}

function loadRemainingPlanetsInServer(dispatch,countDetails){
    let paginationCount = Math.floor(countDetails/10);
    let dividerValue = countDetails/10;
    if(!Number.isInteger(dividerValue)){
      paginationCount = paginationCount+1;
    }
    for(let i=2;i<=paginationCount;i++){
      planetsApi.getRemaningPlanets(i).then(planets =>{
        dispatch({ type: 'LOAD_REMANING_PlANETS', planets })
      }).catch(error =>{
        throw error;
      })
    }
    console.log('ddd')
}

/*export function loadRemainingPlanetsInServer(countDetails){
  return function (dispatch){
    return planetsApi.getRemaningPlanets(countDetails).then(planets =>{
      dispatch({ type: 'LOAD_REMANING_PlANETS', planets })
    }).catch(error =>{
      throw error;
    })
    //console.log(countDetails);
  }
}*/

export function searchDataInStore(text){
  return function (dispatch){
    dispatch({ type: 'SEARCH_TEXT', text })
  }
}  