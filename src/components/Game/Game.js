import React, { Component } from 'react';
import cards from '../../cards.json';
import './Game.css';
import Card from '../Card';
var shuffle = require('shuffle-array'), collection = cards;

class Game extends Component {
  state = {
    chihuahuas: cards,
    score: 0,
    highScore: 0,
    pickedSoFar: []
  }

  randomizeDogs() {
    shuffle(collection);
    // console.log(collection);
    this.setState({
      chihuahuas: collection
    });
  };

  checkHighScore() {
    if (this.state.score >= this.state.highScore) {
      this.setState({
        highScore: this.state.score
      });
    }
    this.checkWin();
  }

  checkWin(){
    if (this.state.score === 5) {
      alert("You win!");
      this.setState({
        highScore: 6
      });
      this.reset();
    }
  }

  incrementScore() {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore
    });
    // console.log("New score: " + newScore);
    // console.log("State score: " + this.state.score);
  }

  reset() {
    this.setState({
      score: 0,
      pickedSoFar: []
    })
  }

  cardClickedOn = (id) => {
    if (this.state.pickedSoFar.indexOf(id) === -1) {
      this.incrementScore();
      this.setState({
        pickedSoFar: this.state.pickedSoFar.concat(id)
      });
      // console.log(this.state.pickedSoFar);
    }
    else {
      this.reset();
    }
    this.checkHighScore();
    this.randomizeDogs();
  };

  render() {
    return (
      <div className="container">
        <p>Score: {this.state.score}</p>
        <p>High Score: {this.state.highScore}</p>
        {this.state.chihuahuas.map(chihuahua => (
          <Card
            key={chihuahua.id}
            id={chihuahua.id}
            name={chihuahua.name}
            image={chihuahua.image}
            cardClickedOn={this.cardClickedOn}
            randomizeDogs={this.randomizeDogs} />
        ))}
      </div>
    );
  }
}

export default Game;