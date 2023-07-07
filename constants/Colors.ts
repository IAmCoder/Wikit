const primary = '#4682B4'
const blues = {
  blue900: '#0D47A1',
  blue500: '#2196F3',
}
const grays = {
  white: '#fff',
  gray100: '#F2F2F2', 
  gray200: "#cccccc", 
  gray800: '#5D5D5D', 
  gray900: '#333333', 
  gray950: '#1e1e1e', 
  gray975: '#121212', 
  black: '#000',
}

export default {
  light: {
    primary,
    text: grays.gray900,
    background: grays.gray100,
    tint: primary,
    tabIconDefault: '#ccc',
    ...blues,
    ...grays,
    completedBackground: primary,
    completedPrimary: grays.white,
    navBarBackground: grays.white,
    xp: grays.gray200
  },
  dark: {
    primary,
    text: grays.white,
    background: grays.black,
    tint: primary,
    tabIconDefault: '#ccc',
    ...blues,
    ...grays,
    white: grays.black,
    completedBackground: grays.black,
    completedPrimary: blues.blue500,
    navBarBackground: grays.black,
    xp: grays.gray900
  },
}
