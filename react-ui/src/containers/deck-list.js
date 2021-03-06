import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'tachyons-components'

import { selectDeck } from '../actions/index';
import { deleteDeck } from '../actions/index';
import { bindActionCreators } from 'redux';
import Game from './game';


class DeckList extends Component {
	

	renderList() {

		if(!this.props.deck) {
			return this.props.decks.map((deck) => {
				//console.log(this.props.decks);
				return (
					<div className="tc db">
						<button
							key={deck.deckname}
							onClick={() => this.props.selectDeck(deck)}  
							className="button mt3 ml2 mr2 tc">
							{deck.deckname}
						</button>
						<button
							key={deck._id}
							value={deck._id}
							onClick={() => this.props.deleteDeck(deck._id)}
							className="button"
						>Delete
						</button>
					</div>
				);
			});
		}
		else {
			return <div></div>
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
			
				{this.renderList()}

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
