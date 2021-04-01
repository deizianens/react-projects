import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <h1>React Colors App</h1>
        {palettes.map((palette) => {
          return (
            <p>
              <MiniPalette {...palette} />
            </p>
          );
        })}
      </div>
    );
  }
}

export default PaletteList;
