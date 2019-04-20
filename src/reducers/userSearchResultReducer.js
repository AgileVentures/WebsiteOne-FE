import { SELECTED_LANGUAGE } from '../types'
import { FILTERED_PROJECTS_STATE} from '../types'
import initialState from './initialState'

export const selectedLanguageReducer=(state=initialState.selectedLanguage2, action)=>{
      	if(action.type===SELECTED_LANGUAGE){               
               return action.payload                            	 
	}          
        return state
}

export const filteredProjectsReducer=(state=initialState.filteredProjectsState,action)=>{
	 if(action.type=== FILTERED_PROJECTS_STATE){
           return action.payload
	 }
         return state
}
