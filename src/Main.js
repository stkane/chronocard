import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SortableComponent from "./components/sortable_component";
import Login from "./login";
import facts_db from './data/facts';

import NewGameButton from "./components/new_game";
import Greeting from "./components/greeting";
import DeckSelector from "./components/deck_selector";

 
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      facts: facts_db
    }
  }
  render() {
    return (
      <div>
        <h1>C h r o n o C a r d</h1>
        <DeckSelector allDecks={facts_db}/>
       
      </div>
    );
  }
}
 
export default Main;