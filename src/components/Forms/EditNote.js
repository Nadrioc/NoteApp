import React, {Component} from 'react';
import Header from '../Header/Header';
import Form from './Form.js';
import * as auth from '../../services/auth';
import './Form.css'

class EditNote extends Component {

	state = {
		title: "",
		body: "",
		id: null,
		editSuccess: false,
		isValid: true,
		bannerTimeout: null
	}

	 componentDidMount = async () => {
		let authHeader = auth.getAuthHeader()
		const id = this.props.match.params.noteId;
		const requestOptions = {
			method: 'GET',
			headers: {...authHeader}
		};
		const response = await fetch(`https://note.dev.cloud.lightform.com/notes/${id}`, requestOptions);
		const data = await response.json();
		this.setState({
			title: data.title,
			body: data.body,
			id: id
		})
	}

	componentWillUnmount = () =>{
		clearTimeout(this.bannerTimeout);
	}


	handleTitleChange = (event) => {
		this.setState({
			title: event.target.value,
			isValid: (event.target.value.trim() !== "")
		});
	}

	handleBodyChange = (event) => {
		this.setState({body: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(this.state.title !== ""){	
			this.editToDB()
		}
	}

	showSuccessBanner = () => {
		this.setState({ editSuccess: true });
		this.bannerTimeout = setTimeout(() => {
			this.setState({ editSuccess: false });
		}, 2000);
	}

	editToDB = () => {
		let authHeader = auth.getAuthHeader()
		const requestOptions = {
			method: 'PATCH',
			headers: { 
				'Content-Type': 'application/json', 
				...authHeader 
			},
			body: JSON.stringify({title: this.state.title, body: this.state.body})
		};
		fetch(`https://note.dev.cloud.lightform.com/notes/${this.state.id}`, requestOptions)
			.then(async response => {
				if(!response.ok){
					const error = response.status;
					return Promise.reject(error);
				} else {
					return
				}
			})
			.then(() => {
				this.showSuccessBanner()
			})
			.catch(error => {
				console.error('My Error:', error);
			});
	}

	render(){	
		return (
			<>
			<Header buttonText="Update" submit={this.handleSubmit} success={this.state.editSuccess} parent="form"/>
			<Form body={this.state.body} isValid={this.state.isValid} title={this.state.title} titleChange={this.handleTitleChange} bodyChange={this.handleBodyChange}/>
			</>
		);
	}

}

export default EditNote;
