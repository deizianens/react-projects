import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
  static defaultProps = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
  };

  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };

  render() {
    return (
      <button
        className={'Die'}
        style={{ backgroundColor: this.props.locked ? 'grey' : 'black' }}
        onClick={this.handleClick}
      >
        <i className={`fas fa-dice-${this.props[this.props.val]}`}></i>
      </button>
    );
  }
}

export default Die;
