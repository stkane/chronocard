import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectDeck } from '../actions/index';
import styled from 'tachyons-components';
import '../index.css';

class Header extends Component {
	render() {
		return(
			<header>
				<nav className="wt helvetica navbar navbar-inverse">
					<div className="container-fluid">
						<div className="nav navbar-nav">
								<Link onClick={() => this.props.deselectDeck()} className="navbar-brand" to='/'>Home</Link>
						</div>

						<form className="navbar-form navbar-right">
					        <button type="submit" class="btn btn-login">Log In</button>
					     </form>
					     <ul  className="nav navbar-nav navbar-right">						  
						    <li className="wt"><Link onClick={() => this.props.deselectDeck()} className="wt" to='/decklist'>All Decks</Link></li>
						    <li><Link onClick={() => this.props.deselectDeck()} className="wt" to='/newdeck'>New Deck</Link></li>
						</ul>
						    
					    
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
