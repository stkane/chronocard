import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './index.css';

var cardsArr = [];
var yearsArr = [];
var copyYearsArr = [];
var answerArr = [];

var factsArr = [
  {
  fact: "a",
  date: 5
  },
  {
  fact: "b",
  date: 10
  },
  {
  fact: "c",
  date: 15
  },
  {
  fact: "d",
  date: 20
  },
  {
  fact: "e",
  date: 25
  },
  {
  fact: "f",
  date: 30
  },
  {
  fact: "g",
  date: 35
  },
  {
  fact: "h",
  date: 40
  },
  {
  fact: "i",
  date: 45
  },
  {
  fact: "j",
  date: 50
  },
  {
  fact: "k",
  date: 55
  },
  {
  fact: "l",
  date: 60
  },
  {
  fact: "m",
  date: 65
  },
  {
  fact: "n",
  date: 70
  }
];

function NewGame(props) {
  return(
    <button className="buttons" onClick={props.onClick}>New Game</button>
    );
}

function dealTen(array) {
  cardsArr = [];
  yearsArr = [];
  array.sort(function(a, b){return 0.5 - Math.random()});
  for (let i = 0; i < 10; i++) {
    cardsArr[i] = array[i].fact;
    yearsArr[i] = array[i].date;
    copyYearsArr[i] = array[i].date;
  }
  answerArr = copyYearsArr.sort(function(a, b){return a-b})
}

function Score(props){
  return(
    <div>Score: {props.winNum}</div>
    );
}

const SortableItem = SortableElement(({value}) =>
  <div className="items" >{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="container">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  state = {
    items: Array(10).fill(null),
    year: Array(10).fill(null),
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
      year: arrayMove(this.state.year, oldIndex, newIndex),
    });
  };

  handleClick(){
    dealTen(factsArr);
    this.setState({items: cardsArr});
    this.setState({year: yearsArr});
  }

  
  renderNewGame() {
    return (
      <NewGame onClick={() => this.handleClick()}
      />
      );
  }

  renderScore() {
    var counter = 0;
    for(let i = 0; i < 10; i++) {
      if (this.state.year[i] != answerArr[i]) {
        counter += 1;
      }
    }
    
    return (
      <Score winNum={counter}/>
      );
  }


  render() {
    return (
      <div>
      <SortableList items={this.state.items} year={this.state.year}axis="x" onSortEnd={this.onSortEnd} />
      {this.renderNewGame()}
      {this.renderScore()}
      </div>
      );
  }
}

render(<SortableComponent/>, document.getElementById('root'));