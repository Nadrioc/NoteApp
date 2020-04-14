import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import Header from '../Header/Header';
import Form from './Form';
import * as auth from '../../services/auth';
import './Form.css'

class NewNote extends Component {

	state = {
		title: "",
		body: "",
		redirect: false,
		isValid: true
	}

	handleTitleChange = (event) => {
		this.setState({
			title: event.target.value,
			isValid: (event.target.value.trim() !== "")
		});
	}

	handleBodyChange = (event) => {
		this.setState({ body: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(this.state.title !== ""){	
			this.saveToDB()
		}
	}

	renderRedirect = () => {
		if (this.state.redirect) {
      return <Redirect to='/' />
    }
	}

	saveToDB = () => {
		let authHeader = auth.getAuthHeader()
		const requestOptions = {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json', 
				...authHeader
			},
			body: JSON.stringify({title: this.state.title, body: this.state.body})
		};
		
		fetch('https://note.dev.cloud.lightform.com/notes', requestOptions)
			.then(async response => {
				if(!response.ok){
					const error = response.status;
					return Promise.reject(error);
				} else {
					return
				}
			})
			.then(() => {
				this.setState({
					title: "",
					body: "",
					redirect: true
				})
			})
			.catch(error => {
				console.error('My Error:', error);
			});
	}

	render(){    

		return (
			<>
			{this.renderRedirect()}
			<Header buttonText="Create" submit={this.handleSubmit} parent="form"/>
			<Form body={this.state.body} isValid={this.state.isValid} title={this.state.title} titleChange={this.handleTitleChange} bodyChange={this.handleBodyChange}/>
			</>
		);
	}

}

export default NewNote;
