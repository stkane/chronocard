import React, { Component } from "react";
import styled from 'tachyons-components'
import Main from './Main';
import Header from '../containers/Header';

import DeckList from "../containers/deck-list";
import NewDeck from "../containers/new_deck";
import { fetchDecks } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import '../index.css';

var deck = {
    "cards" : [ 
        {
            "fact" : "C",
            "date" : 1
        }, 
        {

            "fact" : "H",
            "date" : 2
        }, 
        {

            "fact" : "R",
            "date" : 3
        }, 
        {

            "fact" : "O",
            "date" : 4
        }, 
        {

            "fact" : "N",
            "date" : 6
        }, 
        {

            "fact" : "O",
            "date" : 7
        }, 
        {

            "fact" : "C",
            "date" : 8
        }, 
        {

            "fact" : "A",
            "date" : 9
        }, 
        {

            "fact" : "R",
            "date" : 10
        }, 
        {

            "fact" : "D",
            "date" : 11
        } 
    ],
    "deckname" : "title",
    "author" : "stephen kane",
    "subject" : "trivia",
}

const SortableItem = SortableElement(({value}) =>
  <div className="title" >{value}</div>
);

const SortableList = SortableContainer(({items, year}) => {
  return (
    <div className="title-container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} year={year} index={index} value={value} />
      ))}
    </div>
  );
});
 
export default class Home extends Component {
  constructor(props) {
  	super(props);
    this.state = {
      facts: deck.cards.map(card => {return card.fact}),
      dates: deck.cards.map(card => {return card.date}),
      answer: deck.cards.map(card => {return card.date})
    };

  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      facts: arrayMove(this.state.facts, oldIndex, newIndex),
      dates: arrayMove(this.state.dates, oldIndex, newIndex),
    });
  };
  render() {
    return (
      <div >
         <SortableList items={this.state.facts} year={this.state.dates} axis="x" onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}
