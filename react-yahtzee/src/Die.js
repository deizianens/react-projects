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
    val: 1,
  };

  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };

  render() {
    let classes = `Die fas fa-dice-${this.props[this.props.val]} fa-5x`;
    if (this.props.locked) classes += ' Die-locked';
    if (this.props.rolling) classes += ' Die-rolling';

    return <i className={classes} onClick={this.handleClick} />;
  }
}

export default Die;
