import React from 'react';
import './Form.css'

const Form = (props) => {

	let titleClass = "title-input"
	if(!props.isValid){
		titleClass = "title-input-invalid"
	}

	return(
		<div className="center-container">
			<form>
				<input
					name="title"
					type="text"
					value={props.title}
					onChange={props.titleChange} 
					className={titleClass}
					placeholder="Title Here"/>
				<br />
				<textarea
					name="numberOfGuests"
					type="number"
					value={props.body}
					onChange={props.bodyChange}
					className="body-input"
					placeholder="Your note goes here"/>
			</form>
		</div>
	)

}

export default Form;