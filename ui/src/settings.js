const settings = {
  apiEndpoint: `http://162.243.61.215:5000/`
}

export const getSetting = (keyword) => {
  return settings[keyword] ? settings[keyword] : null;
}
