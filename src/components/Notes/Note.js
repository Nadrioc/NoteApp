import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';

class Note extends Component {

	state = {
		isHovering: false
	}

	handleHover = () => {
		this.setState({
			isHovering: true
		})
	}

	removeHover = () => {
		this.setState({
			isHovering: false
		})
	}

	handleOnClick = () => {
		this.props.delete(this.props.note.id)
	}

 render(){	

 		let visibleOnHover = "no-opacity"
		if(this.state.isHovering){
			visibleOnHover = ""
		}

 		return (
 			<div className="note-container" onMouseLeave={this.removeHover} onMouseOver={this.handleHover}>	
	 			<Link to={`/notes/${this.props.note.id}`} id={this.props.note.id} className="button-link note-link">
					<div>
		 				<h1 className="text-center">{this.props.note.title}</h1>
		 				<h4 className="text-center body-text">{this.props.note.body}</h4>
	 				</div>
				</Link>	
 				<span role="img" aria-label="delete-note" className={`delete-button ${visibleOnHover}`} onClick={this.handleOnClick}>❌</span>
 			</div>
 		);
	}
  
}

export default Note;
