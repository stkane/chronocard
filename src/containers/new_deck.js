import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewDeck } from '../actions/index';
import { getDeckByDeckname } from '../actions/index';
import { selectDeck } from '../actions/index';
import styled from 'tachyons-components'
import { Redirect } from 'react-router';
import { fetchDecks } from '../actions/index';
import { DeckBuilder } from './deck_builder';


class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckname: '',
			author: '',
			subject: '',
			fireRedirect: false
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
		this.props.createNewDeck(
			this.state.deckname, 
			this.state.author, 
			this.state.subject
			);

		//deckObj = this.props.getDeckByDeckname(this.state.deckname);

		this.setState({

			fireRedirect: true
		});
	}

	render() {
		const { from } = this.props.location.state || '/';
		let redirectRoute = `/${this.state.deckname}/cards`;
		const { fireRedirect } = this.state.fireRedirect;
		return(
			<div>
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
				{this.state.fireRedirect && (
					//make deckbuilder/${deckid} or maybe just conditionally renders
					//the create deck builder componenent
					<Redirect from='/newdeck' to={redirectRoute} />
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		decks: state.decks,
		deck: state.activeDeck
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign(
		{}, 
		{ fetchDecks }, 
		{ createNewDeck },
		{ getDeckByDeckname },
		{ selectDeck }
		), dispatch);
}

export default connect(null, mapDispatchToProps)(NewDeck);