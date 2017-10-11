import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './index.css';

var cardsArr = [];
var yearsArr = [];
var copyYearsArr = [];
var answerArr = [];
var counter = 0;

var factsArr = [
  {
  fact: "US Declaration of Independence",
  date: 1776
  },
  {
  fact: "Stephen's birth year",
  date: 1986
  },
  {
  fact: "Jesus' birth year",
  date: -6
  },
  {
  fact: "Plato dies",
  date: -348
  },
  {
  fact: "End of WWII",
  date: 1945
  },
  {
  fact: "Happy Days Cancelled",
  date: 1984
  },
  {
  fact: "Happy Days Originally Aired",
  date: 1974
  },
  {
  fact: "Borat Released",
  date: 2006
  },
  {
  fact: "Iran Hostage Crisis ends",
  date: 1981
  },
  {
  fact: "Lost in space TV show airs",
  date: 1965
  },
  {
  fact: "US Lands on moon",
  date: 1969
  },
  {
  fact: "Kennedy Assassinated",
  date: 1963
  },
  {
  fact: "Scientology founded",
  date: 1954
  },
  {
  fact: "Women get the vote (US)",
  date: 1920
  }
];

function PlaySound() {
    var sound = document.getElementById("audio");
    sound.play()
}

function NewGame(props) {
  return(
    <button className="buttons" onClick={props.onClick}>New Game</button>
    );
}

var levenshtein = function(a, b) {
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length;
  
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
      if(b[i-1] == a[j-1]){
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

  counter = row[a.length];
}

function dealTen(array) {
  cardsArr = [];
  yearsArr = [];
  array.sort(function(a, b){return 0.5 - Math.random()});
  for (let i = 0; i < 8; i++) {
    cardsArr[i] = array[i].fact;
    yearsArr[i] = array[i].date;
    copyYearsArr[i] = array[i].date;
  }
  answerArr = copyYearsArr.sort(function(a, b){return a-b})
}

function Score(props){
  return(
    <div className="scoreboard"># of moves until correct: {props.winNum}</div>
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
    items: Array(8).fill(<h2>?</h2>),
    year: Array(8).fill(null),
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
    PlaySound();
  }

  
  renderNewGame() {
    return (
      <NewGame onClick={() => this.handleClick()}
      />
      );
  }

  renderScore() {
    counter = 0;
    levenshtein(answerArr, this.state.year);

    return (
      <Score winNum={counter}/>
      );
  }


  render() {
    return (
      <div class="wrapper">
        <h1>C h r o n o C a r d</h1>
        
          <SortableList items={this.state.items} year={this.state.year}axis="x" onSortEnd={this.onSortEnd} />
          {this.renderNewGame()}
          {this.renderScore()}
          <audio id="audio" src="./pop.mp3"></audio>
        
      </div>
      );
  }
}

render(<SortableComponent/>, document.getElementById('root'));