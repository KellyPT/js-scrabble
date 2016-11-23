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

var Player = function(name) {
  this.name = name;
  this.game = new Scrabble();
};

// plays: property which returns an Array of the words played by the player
Player.prototype.plays = [];

// play(word): Function which adds the input word to the plays Array. Returns false if player has already won
Player.prototype.play = function(word) {
  if (this.hasWon === true) {
    return false;
  }
  var userInput = word.toUpperCase();
  this.plays.push(userInput);
  return true;
};

// totalScore(): Function which sums up and returns the score of the players words
Player.prototype.totalScore = function() {
  var total = 0;
  var len = this.plays.length;
  for (var i = 0 ; i < len; i++) {
    var wordScore = this.game.score(this.plays[i]);
    total += wordScore;
  }
  return total;
};

// hasWon(): Function which returns true if the player has over 100 points, otherwise returns false
Player.prototype.hasWon = function() {
  if (this.totalScore() > 100) {
    return true;
  } else {
    return false;
  }
};

// highestScoringWord(): Function which returns the highest scoring word the user has played
Player.prototype.highestScoringWord = function() {
  if (this.plays.length === 0) {
    console.log("This player hasn't played yet.");
    return null;
  }
  return this.game.highestScoreFrom(this.plays);
};

// highestWordScore(): Function which returns the highestScoringWord score
Player.prototype.highestWordScore = function() {
  if (this.highestScoringWord() === null) {
    console.log("You don't have a score yet!");
    return null;
  } else {
    return this.game.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;

// SCRABBLE TESTS:
// testing score(word) function
var sampleScore = new Scrabble();
console.log(sampleScore.score("lioness")); // 57
// console.log("=====");

// testing the highestScoreFrom(arrayOfWords) function
var highest1 = sampleScore.highestScoreFrom(['CAT', 'COW', 'LIONESS']);
console.log(highest1); // 'LIONESS'
// console.log("=====");

var highest2 = sampleScore.highestScoreFrom(['CAT', 'QQQQQJ', 'AAAAAAG']);
console.log(highest2); // 'AAAAAAG'
// console.log("=====");

var highest3 = sampleScore.highestScoreFrom(['CAT', 'QQQQJ', 'QQQQBK']);
console.log(highest3); // 'QQQQJ'
// console.log("=====");

var highest4 = sampleScore.highestScoreFrom(['CAT', 'QQQQJ', 'QQQQX']);
console.log(highest4); // 'QQQQJ'
// console.log("=====");

// PLAYER TESTS:
// testing play(word)
var kelly = new Player('Kelly');
var kellyPlay1 = kelly.play('happy');
var kellyPlay2 = kelly.play('sad');
var kellyPlay3 = kelly.play('cheerful');

// testing plays
var kellyPlays = kelly.plays;
console.log(kellyPlays); // array ['happy', 'sad']

// testing totalScore()
var kellyTotal = kelly.totalScore();
console.log(kellyTotal);

// testing hasWon()
var kellyWon = kelly.hasWon();
console.log(kellyWon);

//testing highestScoringWord()
var kellyHighestWord = kelly.highestScoringWord();
console.log(kellyHighestWord);

// testing highestWordScore()
var kellyHighestScore = kelly.highestWordScore();
console.log(kellyHighestScore);
