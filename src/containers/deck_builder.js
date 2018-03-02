import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDeck } from '../actions/index';
import { deleteDeck } from '../actions/index';

class DeckBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fact: '',
			date: undefined
		};
	}

	render() {
		console.log('hi' + window.location.hostname);
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
	return bindActionCreators(Object.assign({}, { selectDeck }, { deleteDeck }), dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(DeckBuilder);