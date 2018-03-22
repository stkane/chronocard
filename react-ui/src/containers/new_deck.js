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
				<div className='dib measure'>
					<input type="text" className="input-reset ba b--black-20 pa2 mb2 db w-100" name="fact" value={el.fact||''} onChange={this.handleCardChange.bind(this, i)} />
				</div>
				<div className='ml4 dib measure'>
					<input type="number" className="input-reset ba b--black-20 pa2 mb2 db w-100" name="date" value={el.date||''} onChange={this.handleCardChangeTwo.bind(this, i)} />
				</div>
				<div className='ml4 dib measure'>
					<input type='button'  value='remove' onClick={this.removeClick.bind(this, i)}/>
				</div>
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
			<div className="tc">
				<form className="pa4 black-80" onSubmit={this.onFormSubmit}>
					<div className="db">
						<div className="dib measure">
							<label for="deckname-label" className="f6 b db mb2">Deck Title <span class="normal black-60"></span></label>
							<input name="deckname" value={this.state.deckname} onChange={this.onInputChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
							
						</div>
						<div className="ml4 dib measure">
							<label for="author-label" className="f6 b db mb2">Author <span class="normal black-60"></span></label>
							<input name="author" value={this.state.author} onChange={this.onInputChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
							
						</div>
						<div className="ml4 dib measure">
							<label for="subject-label" className="f6 b db mb2">Subject <span class="normal black-60"></span></label>
							<input name="subject" value={this.state.subject} onChange={this.onInputChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
						</div>
					</div>


					{this.createCard()}
					<span className="dib">
						<input className="button mr3" type='button' value='add card' onClick={this.addClick.bind(this)}/>
					
						<button className="ml3 button" type="submit">Submit</button>
					</span>
					
				</form>
				
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
