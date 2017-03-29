import COLORS from '../../constants/colors';


export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    minHeight: '300px'
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    empty: {
      height: '32px'
    }
  },
  permalink: {
    marginLeft: 'auto'
  },
  viz: {
  },
  titleBar: {
    marginTop: 'auto',
    minHeight: '50px',
    maxHeight: '100px',
    backgroundColor: COLORS.BROWN.rgba
  },
  title: {
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  subtitle: {

  }
}
