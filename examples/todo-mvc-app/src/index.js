import { render } from 'lightpulse';
import { App } from './components/App';

const app = App();

render(document.getElementById('app'), app.DOM);
