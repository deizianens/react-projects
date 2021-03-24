import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: 'Score 1 for every 1',
        twos: 'Score 2 for every 2',
        threes: 'Score 3 for every 3',
        fours: 'Score 4 for every 4',
        fives: 'Score 5 for every 5',
        sixes: 'Score 6 for every 6',
        threeOfKind: 'Sum all dice if 3 of one value',
        fourOfKind: 'Sum all dice if 4 of one value',
        fullHouse: 'If full house, score 25',
        smallStraight: 'If 4+ values in a row, score 30',
        largeStraight: 'If 5 values in a row, score 40',
        yahtzee: 'If all values match, score 50',
        chance: 'Score sum of all dice',
      },
      rolling: false,
    };
  }

  componentDidMount() {
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  };

  roll = (evt) => {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
    }));
  };

  toggleLocked = (idx) => {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState((st) => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1),
        ],
      }));
    }
  };

  doScore = (rulename, ruleFn) => {
    // evaluate this ruleFn with the dice and score this rulename

    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.animateRoll();
  };

  displayRollInfo() {
    const messages = [
      '0 Rolls Left',
      '1 Roll Left',
      '2 Rolls Left',
      'Starting Round',
    ];

    return messages[this.state.rollsLeft];
  }

  render() {
    const { dice, locked, rolling, scores } = this.state;
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              rolling={rolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={locked.every((x) => x) || rolling}
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
