import React, {Component} from 'react';
import Note from './Note'
import Header from '../Header/Header';
import * as auth from '../../services/auth';
import './Notes.css';

class Notes extends Component {

	state = {
		notes: [], 
	}

	async componentDidMount() {
		let authHeader = auth.getAuthHeader()
		const requestOptions = {
			method: 'GET', 
			headers: {...authHeader}
		};
		const response = await fetch('https://note.dev.cloud.lightform.com/notes', requestOptions)
		const data = await response.json();
		const noteList = data._embedded.notes
		this.setState({ notes: noteList })
	}

	removeNoteFromList = (id) => {
		let notesCopy = [...this.state.notes];
		let modifiedNotes = notesCopy.filter((note) => {
			return note.id !== id
		})
		this.setState({ notes: modifiedNotes })
	}

	deleteNote = (id) => {
		let authHeader = auth.getAuthHeader()
		const requestOptions = {
			method: 'DELETE',
			headers: {...authHeader}
		};
		fetch(`https://note.dev.cloud.lightform.com/notes/${id}`, requestOptions)
			.then(async response => {
				if(!response.ok){
					const error = response.status;
					return Promise.reject(error);
				} else {
					return
				}
			})
			.then(() => {
				this.removeNoteFromList(id)
			})
			.catch(error => {
				console.error('My Error:', error);
			});
	}

 render(){	

 	const noteList = this.state.notes.map(note => {
 		return <Note key={note.id} note={note} delete={(id) => window.confirm(`Remove this note?`) && this.deleteNote(id)}/>
 	})


	return (
		<>
		<Header buttonText="Create New Note" parent="notes"/>
		<div className="center-container">
			<div>
				{noteList}
			</div>
		</div>
		</>
	);
	}
  
}

export default Notes;
