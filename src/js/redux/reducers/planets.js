const initialState = {
    searchText: '',
    planets: []
};

export default function planetsPage(state=initialState, action) {
    if(action.type === 'LOAD_PlANETS'){
        return {...state,planets:[...action.planets.results]}
    }else if(action.type === 'LOAD_REMANING_PlANETS'){
        return {...state,planets:[...state.planets,...action.planets.results]}
    }else if(action.type === 'SEARCH_TEXT'){
        return Object.assign({}, state, {
            searchText: action.text
        });
    }    
    return state;
  }
  