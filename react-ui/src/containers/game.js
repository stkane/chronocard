import React, { Component } from 'react';
import styled from 'tachyons-components'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectDeck } from '../actions/index';
import '../index.css';
let deckLengthMax = 8;

const SortableItem = SortableElement(({value}) =>
  <div className="items" >{value}</div>
);

const SortableList = SortableContainer(({items, year}) => {
  return (
    <div className="container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} year={year} index={index} value={value} />
      ))}
    </div>
  );
});

const levenshtein = function(a, b) {
  var counter = 0;
  if(a.length === 0) return b.length; 
  if(b.length === 0) return a.length;
  
  if(a.length > b.length) {
    var tmp = a;
    a = b;
    b = tmp;
  }

  var row = [];
  // init the row
  for(var i = 0; i <= a.length; i++){
    row[i] = i;
  }

  for(var i = 1; i <= b.length; i++){
    var prev = i;
    for(var j = 1; j <= a.length; j++){
      var val;
      if(b[i-1] === a[j-1]){
        val = row[j-1]; // match
      } else {
        val = Math.min(row[j-1] + 1, // substitution
                       prev + 1,     // insertion
                       row[j] + 1);  // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return counter = row[a.length];
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: this.props.deck.cards.map(card => {return card.fact}),
      dates: this.props.deck.cards.map(card => {return card.date}),
      answer: this.props.deck.cards.map(card => {return card.date})
    };
    //this.shuffle(this.state.facts, this.state.dates);
  }



  componentDidMount() {
    this.shuffle(this.state.facts, this.state.dates, this.state.answer);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      facts: arrayMove(this.state.facts, oldIndex, newIndex),
      dates: arrayMove(this.state.dates, oldIndex, newIndex),
    });
  };



	shuffle(a, b, c) {
	    var j, x, i, y, z;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        y = b[i];
          z = c[i];
	        a[i] = a[j];
	        b[i] = b[j];
          c[i] = c[j];
	        a[j] = x;
	        b[j] = y;
          c[j] = z;
	    }
      if(a.length > deckLengthMax) {
        var cut = a.length - deckLengthMax;
        a = a.slice(cut);
        b = b.slice(cut);
        c = c.slice(cut);
      }
      c = c.sort((a, b) => {return a - b});
	    this.setState({
	    	facts: a,
	    	dates: b,
        answer: c
	    });
	}

  giveUp() {
  	return (
  		<button onClick={() => this.props.deselectDeck()}>Give up</button>
  	);
  }

  renderScore() {
    var counter = 0;
    counter = levenshtein(this.state.answer, this.state.dates);

    return (
      <div>{counter}</div>
      );
  }


	render() {
		return (
			<div>
				<SortableList items={this.state.facts} year={this.state.dates} axis="x" onSortEnd={this.onSortEnd} />
				{this.giveUp()}
				{this.renderScore()}

			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);