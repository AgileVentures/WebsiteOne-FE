
import React, { Fragment } from 'react'
import './Homepage.css'
import modals from './modals'
import { Grid } from 'semantic-ui-react'
import HomepageModal from './HomepageModal'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { RingLoader } from 'react-spinners'
export class About extends React.Component{
	constructor(props){
		super(props);
		this.state={about: null}
	}
	componentDidMount () {
    		axios.get('api/v1/static-pages/about-us').then(response => {
      			this.setState({ about: response.data })
    		})
  	    }
	

	render(){
		let { about  }=this.state
		console.log(about)
		

				
			     if(about){	
				
				   return(<div id='main'> {ReactHtmlParser(about)} </div>)
				
				}
			     else{	
				
				   return( <RingLoader sizeUnit={'px'} size={200} color={'#34495E'} />)
				
			     }	
				
			
			
		

	}

}
export default About
