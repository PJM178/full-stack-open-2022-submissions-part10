// bad theming, there should only be themes for colors, fonts, etc. that are used
// throughout the app, not for individual components

const theme = {
  appBar: {
    container: {
      colors: {
        background: '#24292e',
      },
    },
    text: {
      colors: {
        primary: 'rgba(255, 255, 255, 1)'
      }
    }
  },
  repositoryItem: {
    fontWeights: {
      bold: '700',
    },
  },
};

export default theme;