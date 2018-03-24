import React, { Component } from "react";
import styled from 'tachyons-components'
import Main from './Main';
import Header from '../containers/Header';

import DeckList from "../containers/deck-list";
import NewDeck from "../containers/new_deck";
import { fetchDecks } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

 
class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.props.fetchDecks('decks');

	// }
	componentWillMount() {
		this.props.fetchDecks('decks');
	}

  render() {
    return (
      <div>

        <Header />
        <Main />




       
      </div>
    );
  }
}
 

function mapDispatchToProps(dispatch) {
	return bindActionCreators({fetchDecks: fetchDecks}, dispatch);
}

export default connect (null, mapDispatchToProps)(App);
