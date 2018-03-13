import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectDeck } from '../actions/index';
import styled from 'tachyons-components';

class Header extends Component {
	render() {
		return(
			<header>
				<nav className="tc mw7 center mt4">
					<Link onClick={() => this.props.deselectDeck()} className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/decklist'>Deck List</Link>
					<Link onClick={() => this.props.deselectDeck()} className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/newdeck'>New Deck</Link>
				</nav>
			</header>
		);
	}



}

function mapStateToProps(state) {
	return {
		deck: state.activeDeck
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ deselectDeck: deselectDeck }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
