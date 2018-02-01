import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewDeck } from '../actions/index';
import '../index.css';

class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckname: '',
			author: '',
			subject: ''
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.createNewDeck(this.state);
		console.log("yo?")
		this.setState({
			deckname: '',
			author: '',
			subject: ''
		});
	}

	render() {
		return(
			<form onSubmit={this.onFormSubmit}>
				<input
					placeholder="deck title"
					name="deckname"
					value={this.state.deckname}
					onChange={this.onInputChange}
				/>
				<input
					placeholder="deck author"
					name="author"
					value={this.state.author}
					onChange={this.onInputChange}
				/>
				<input
					placeholder="deck subject"
					name="subject"
					value={this.state.subject}
					onChange={this.onInputChange}
				/>
				<span>
					<button type="submit">Submit</button>
				</span>
			</form>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createNewDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewDeck);