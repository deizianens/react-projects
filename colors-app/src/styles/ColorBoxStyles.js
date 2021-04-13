import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
  ColorBox: {
    width: '20%',
    height: (props) => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: 1,
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: (props) => (props.showingFullPalette ? '20%' : '50%'),
    },
    [sizes.down('md')]: {
      width: '50%',
      height: (props) => (props.showingFullPalette ? '10%' : '50%'),
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: (props) => (props.showingFullPalette ? '5%' : '10%'),
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? 'rgba(0,0,0,0.9)' : 'white',
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08 ? 'white' : 'black',
  },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? 'rgba(0,0,0,0.9)' : 'white',
    background: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? 'rgba(0,0,0,0.9)' : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px' /* half width*/,
    marginTop: '-15px' /* half height*/,
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255,255,255,0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    opacity: 0,
    border: 'none',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    color: 'black',
    padding: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute',
  },
  copyMsg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '25',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
  },
};

export default styles;
