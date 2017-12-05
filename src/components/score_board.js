function Score(props){
  return(
    <div className="scoreboard"># of moves until correct: {props.winNum}</div>
    );
}

renderScore() {
    counter = 0;
    levenshtein(answerArr, this.state.year);

    return (
      <Score winNum={counter}/>
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