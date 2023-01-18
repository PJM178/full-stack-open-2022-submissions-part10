// bad theming, there should only be themes for colors, fonts, etc. that are used
// throughout the app, not for individual components
import { Platform } from "react-native";

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
  colors: {
    mainBackground: '#e1e4e8',
    textPrimary: Platform.OS === 'android' ? 'black' : 'blue',
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;