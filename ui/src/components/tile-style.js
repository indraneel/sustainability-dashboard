import COLORS from '../constants/colors';

export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    maxHeight: '500px',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  permalink: {
    marginLeft: 'auto'
  },
  viz: {
    empty: {
      minHeight: '200px'
    }
  },
  bigText: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '48px',
    lineHeight: '72px',
    textAlign: 'center'
  },
  titleBar: {
    minHeight: '50px',
    backgroundColor: COLORS.BROWN.rgba
  },
  title: {
    textAlign: 'center',
    marginLeft: '10px',
    fontSize: '25px',
    lineHeight: '37px',
    fontWeight: 'bold',
    overflow: 'hidden',
    color: COLORS.DARK_GRAY.hex
  },
  subtitle: {

  }
}
