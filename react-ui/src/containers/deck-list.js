import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'tachyons-components';
import { Link } from 'react-router-dom';

import { selectDeck } from '../actions/index';
import { deleteDeck } from '../actions/index';
import { bindActionCreators } from 'redux';
import Game from './game';
import { Button } from 'reactstrap';


class DeckList extends Component {
	

	renderList() {

		if(!this.props.deck) {
			return this.props.decks.map((deck) => {
				//console.log(this.props.decks);
				return (

					<div className="col-md-3 ">
						<button
							key={deck.deckname}
							onClick={() => this.props.selectDeck(deck)}  
							className="decklist-btn ">
							{deck.deckname}
						</button>

					</div>
				);
			});
		}
		else {
			return <div></div>
		}
	}
	renderNewDeck() {
		if(!this.props.deck) {
			return (
				<div className="col-md-3">

					<Link onClick={() => this.props.deselectDeck()} to='/newdeck' className="decklist-newdeck-btn">
						+
					</Link>

				</div>
			);
		}
	}
	renderGame(){
		if (!this.props.deck) {
			return (
				<div></div>
			);
		}
		else{
			return <Game />;
		}

	}

	render() {
		return (
			<div>
				<h3 className="text-center">Pick a deck, any deck</h3>
				<div className="row decklist-container">
					{this.renderNewDeck()}
					{this.renderList()}
					
				</div>

				{this.renderGame()}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		decks: state.decks,
		deck: state.activeDeck
	};
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, { selectDeck }, { deleteDeck }), dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(DeckList);

// const DeckSelector = (props) => {
// 	const deckTitles = props.allDecks.decks.map((value) => {
// 		return (
// 			<button className="mt3 ml2 mr2 tc">{value.deckname}</button>
// 		);
// 	});

// 	return (
// 		<div className="cf">
// 			<div id="deckselector" className="center">
// 				{deckTitles}
// 			</div>
// 		</div>
// 	);
// }

// export default DeckSelector;
