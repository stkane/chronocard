import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DeckList from "../containers/deck-list";
import NewDeck from "../containers/new_deck";
import DeckBuilder from '../containers/deck_builder';


const Main = () => (
  <main>
    <Switch>

      <Route  path='/decklist' component={DeckList}/>
      <Route  path='/newdeck' component={NewDeck}/>

    </Switch>
  </main>
)

export default Main;
