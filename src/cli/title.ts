import figlet from 'figlet';
import gradient from 'gradient-string';
import { APP_TITLE, COLOR_SCHEME } from '../utils/constants';

const renderTitle = () => {
  const colors = [
    COLOR_SCHEME.BRIGHT_RED,
    COLOR_SCHEME.BRIGHT_ORANGE,
    COLOR_SCHEME.BRIGHT_PURPLE,
    COLOR_SCHEME.DARK_GREEN,
    COLOR_SCHEME.BRIGHT_GREEN,
    COLOR_SCHEME.DARK_GREEN,
    COLOR_SCHEME.BRIGHT_PURPLE,
    COLOR_SCHEME.BRIGHT_ORANGE,
    COLOR_SCHEME.BRIGHT_RED,
  ];

  const text = figlet.textSync(APP_TITLE, { font: 'Small' });
  const roseGradient = gradient(colors);

  console.log(roseGradient.multiline(text));
};

export default renderTitle;
