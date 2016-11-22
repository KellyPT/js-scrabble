var Scrabble = function() {
  this.Tiles = {
    A: 1, E: 1, I: 1,O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
    D: 2, G: 2,
    B: 3, C: 3, M: 3, P: 3,
    F: 4, H: 4, V: 4, W: 4, Y: 4,
    K: 5,
    J: 8, X: 8,
    Q: 10, Z: 10
  };

  this.bonus = 50;

  this.score = function(word) {
    var userInput = word.toUpperCase();
    var total = 0;

    for (var i = 0; i < userInput.length; i++) {
      var letterScore = this.Tiles[userInput[i]];
      total += letterScore;
    }

    if (userInput.length === 7) {
      total += this.bonus;
    }

    return total;
  };

  this.highestScoreFrom = function(arrayOfWords) {
    var highestWord = arrayOfWords[0];
    var highestScore = this.score(highestWord);

    for (var i = 0; i < arrayOfWords.length; i++) {
      var wordScore = this.score(arrayOfWords[i]);
      var wordLen = arrayOfWords[i].length;
      // console.log("current word: " + arrayOfWords[i]);
      // console.log("current score: " + wordScore);
      // console.log("current length: " + wordLen);

      if (highestScore < wordScore) {
        highestWord = arrayOfWords[i];
        highestScore = wordScore;
      }
      else if (highestScore === wordScore && highestWord.length !== 7 && wordLen === 7 ) {
        highestWord = arrayOfWords[i];
        highestScore = wordScore;
      }
      else if (highestScore === wordScore && highestWord.length !== 7 && highestWord.length > wordLen ) {
        highestWord = arrayOfWords[i];
        highestScore = wordScore;
      }
      // console.log("Highest Word: " + highestWord);
      // console.log("Highest Score: " + highestScore);
      // console.log("=");
    }

    return highestWord;
  };
};


module.exports = Scrabble;

// testing score(word) function
var sampleScore = new Scrabble();
console.log(sampleScore.score("lioness")); // 57
console.log("=====");
// testing the highestScoreFrom(arrayOfWords) function
var highest1 = sampleScore.highestScoreFrom(['CAT', 'COW', 'LIONESS']);
console.log(highest1); // 'LIONESS'
console.log("=====");

var highest2 = sampleScore.highestScoreFrom(['CAT', 'QQQQQJ', 'AAAAAAG']);
console.log(highest2); // 'AAAAAAG'
console.log("=====");

var highest3 = sampleScore.highestScoreFrom(['CAT', 'QQQQJ', 'QQQQBK']);
console.log(highest3); // 'QQQQJ'
console.log("=====");

var highest4 = sampleScore.highestScoreFrom(['CAT', 'QQQQJ', 'QQQQX']);
console.log(highest4); // 'QQQQJ'
console.log("=====");
