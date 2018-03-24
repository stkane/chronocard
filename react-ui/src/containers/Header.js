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
				<nav className="navbackground flex justify-between bb b--white-10">
				  <a className="link white-70 hover-white no-underline flex items-center pa3" href="">

				  </a>
				  <div className="flex-grow pa3 flex items-center">
				    <Link onClick={() => this.props.deselectDeck()} className="f6 link dib white dim mr3 mr4-ns" to='/decklist'>Deck List</Link>
				    <Link onClick={() => this.props.deselectDeck()} className="f6 link dib white dim mr3 mr4-ns" to='/newdeck'>New Deck</Link>
				    <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" href="#0">Sign Up</a>
				  </div>
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

				// <nav classNameName="bg-black-90 flex justify-between bb b--white-10">
				// 	<div classNameName="flex-grow pa3 flex items-center">
				// 		<Link onClick={() => this.props.deselectDeck()} classNameName="f6 link dib white dim mr3 mr4-ns" to='/decklist'>Deck List</Link>
				// 		<Link onClick={() => this.props.deselectDeck()} classNameName="f6 link dib white dim mr3 mr4-ns" to='/newdeck'>New Deck</Link>
				// 	</div>
				// </nav>
