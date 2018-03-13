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
import { CardBuilder } from './card_builder';


class NewDeck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckname: '',
			author: '',
			subject: '',
			cards: [],
			fireRedirect: false
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		//this.cardCallback = this.cardCallback.bind(this);


	}

	createCard() {
		return this.state.cards.map((el, i) =>
			<div key={i}>
				<input type="text" name="fact" value={el.fact||''} onChange={this.handleCardChange.bind(this, i)} />
				<input type="number" name="date" value={el.date||''} onChange={this.handleCardChangeTwo.bind(this, i)} />
				<input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
			</div>
		)
	}

	addClick(){
    	this.setState(prevState => ({ cards: [...prevState.cards, '']}))
  	}

  	removeClick(i){
	    let cards = [...this.state.cards];
	    cards.splice(i,1);
	    this.setState({ cards });
  	}

  	// handleFactChange(i, event){
  	// 	let cards = [...this.state.cards];
  	// 	cards[i] = event.target.value;
  	// 	this.setState({
  	// 		 cards: {fact: cards} 
  	// 	});
  	// 	console.log(this.state);
  	// }

	handleCardChange(i, event) {
		let cards = [...this.state.cards];
		const target = event.target;
		const value = target.value;
		if(target.name === 'fact') {var targetFact = target.value};

		const name = target.name;
		cards[i] = {
			fact: targetFact,
			date: this.state.cards[i].date
		}
		
		this.setState({
			cards: cards
		})
		console.log(this.state);
	}

	handleCardChangeTwo(i, event) {
		let cards = [...this.state.cards];
		const target = event.target;
		const value = target.value;
		if(target.name === 'date') {var targetDate = target.value};
		const name = target.name;
		cards[i] = {
			fact: this.state.cards[i].fact,
			date: targetDate
		}
		
		this.setState({
			cards: cards
		})
		console.log(this.state);
	}

	// handleCardChangeTwo(i, event) {
	// 	let cards = [...this.state.cards];
	// 	const target = event.target;
	// 	const value = target.value;
	// 	const name = target.name;
	// 	cards[i] = {
	// 		[name]: value
	// 	}
		
	// 	this.setState({
	// 		cards: cards
	// 	})
	// 	console.log(this.state);
	// }

	onInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});

		
	}

	// cardCallback(dataFromCardChild){
	// 	// this.setState(prevState =>({
	// 	// 	cards: [...prevState.cards, dataFromCardChild]
	// 	// }))
	// 	console.log(dataFromCardChild);
	// }

	onFormSubmit(event) {
		event.preventDefault();
		//this.cardCallback();
		this.props.createNewDeck(
			this.state.deckname, 
			this.state.author, 
			this.state.subject,
			this.state.cards
			);
		console.log(this.state);


		//console.log( "state" + this.props.decks);
		//var mydeck = this.props.getDeckByDeckname(this.state.deckname);
		//console.log(this.props.editDeck);
		//this.props.getDeckByDeckname(this.state.deckname);
		//deckObj = this.props.getDeckByDeckname(this.state.deckname);

		this.setState({
			deckname: '',
			author: '',
			subject: '',
			cards: [],
			fireRedirect: false
		});
	}

	render() {
		//const { from } = this.props.location.state || '/';
		//let redirectRoute = `/${this.state.deckname}`;
		//const { fireRedirect } = this.state.fireRedirect;
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
					{this.createCard()}
					<input type='button' value='add more' onClick={this.addClick.bind(this)}/>
					<span>
						<button type="submit">Submit</button>
					</span>
					
				</form>
				
				{//this.state.fireRedirect && (
					//make deckbuilder/${deckid} or maybe just conditionally renders
					//the create deck builder componenent
					//<Redirect from='/newdeck' to={redirectRoute} />
				//)
			}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		decks: state.decks,
		deck: state.activeDeck,
		editDeck: state.editDeck
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
