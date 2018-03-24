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
					<Link onClick={() => this.props.deselectDeck()} className="link white-70 hover-white no-underline flex items-center pa3" to='/'><svg
      className="dib h1 w1"
      data-icon="grid"
      viewBox="0 0 32 32"
      style={{fill:'currentcolor'}}>
      <title>Super Normal Icon Mark</title>
      <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z">
      </path>
    </svg></Link>


				  
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
