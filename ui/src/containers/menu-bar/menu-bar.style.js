import COLORS from '../../constants/colors';

export default {
  root: {
    position: 'fixed',
    zIndex: 10,
    top: 0,
    width: '100%'
  },
  appBar: {
    background: COLORS.LIGHT_GREEN.hex,
  },
  logo: {
    maxWidth: '66px',
    maxHeight: '55px',
  },
  title: {
    marginTop: '15px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: COLORS.WHITE.hex
  },
  openActionEditorButton: {
    cursor: 'pointer',
  },
  closeActionEditorButton: {
    cursor: 'pointer',
  },
  searchBar: {
    flex: '1',
    marginTop: '20px',
    fontSize: '28px'
  }
}
