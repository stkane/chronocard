import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDeck } from '../actions/index';
import { deleteDeck } from '../actions/index';
import { fetchDecks } from '../actions/index';
import { getDeckByDeckname } from '../actions/index';
import axios from 'axios';




class DeckBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckname: window.location.pathname.substr(1),
			fact: '',
			date: undefined,
			deckId: 0
		};
	}

	// componentWillMount() {
	// 	var selected = this.props.getDeckByDeckname(this.state.deckname);
	// 	console.log('mm ' + selected._id);
	// }

	// componentDidMount() {
	// 	var temp = this.props.getDeckByDeckname(this.state.deckname);
	// 	console.log('ho' + temp.deckname);

	// }
	componentWillMount(){
		this.props.fetchDecks('decks');
		
	}

	componentDidMount(){
		console.log('deckbuilder mounted');
		console.log(this.props.decks);

		for(let i = 0; i < this.props.decks.length; i++) {
			if(this.props.decks[i].deckname === this.state.deckname){
				console.log('deck match: ')
				console.log(this.props.decks[i]);
			}
		};

	}



	render() {

			return(
				<div>
					
					<form>
						<input
							placeholder="card fact"
							name="fact"
							value={this.state.fact}
							onChange={this.onInputChange}
						/>
						<input
							placeholder="fact year"
							name="date"
							value={this.state.date}
							onChange={this.onInputChange}
						/>
					</form>
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
		{ selectDeck }, 
		{ deleteDeck },
		{ getDeckByDeckname },
		{ fetchDecks }
		), dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(DeckBuilder);
