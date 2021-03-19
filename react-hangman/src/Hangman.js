import React, { Component } from 'react';
import './Hangman.css';
import img0 from './assets/0.jpg';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  isWinner(word) {
    return !word.includes('_');
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  handleClick() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button
        className='Hangman-letters'
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    let { nWrong, answer } = this.state;
    let { images, maxWrong } = this.props;
    let guessedWord = this.guessedWord();
    let gameOver = nWrong >= maxWrong;

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={`${nWrong} wrong guesses`} />
        <p>Guessed wrong: {nWrong}</p>
        {!gameOver ? (
          this.isWinner(guessedWord) ? (
            <React.Fragment>
              <p className='Hangman-word'>{guessedWord}</p>
              <p>You win</p>
              <button className='Hangman-restart' onClick={this.handleClick}>
                Restart Game
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className='Hangman-word'>{guessedWord}</p>
              <p className='Hangman-btns'>{this.generateButtons()}</p>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <p className='Hangman-word'>{answer}</p>
            <p>You lose</p>
            <button className='Hangman-restart' onClick={this.handleClick}>
              Restart Game
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Hangman;
