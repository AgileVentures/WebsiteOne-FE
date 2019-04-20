import { SELECTED_LANGUAGE } from '../types'
import { FILTERED_PROJECTS_STATE} from '../types'

export let selectedlanguage= selected_Language =>{
  return {
          type: SELECTED_LANGUAGE,
          payload: selected_Language 
         }
} 

export let filteredprojects= props =>{
  return {
	   type:FILTERED_PROJECTS_STATE,	
	   payload:{
                    filteredProjectsList:props.filteredProjectsList,
		    pageCount	 :props.pageCount,
		    firstPage    :props.firstPage,	
                    lastPage     :props.lastPage,
                    selectedPage :props.selectedPage 
                    }		
	 }
}
