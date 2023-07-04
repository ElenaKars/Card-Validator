import CardWidget from './CardWidget';
import LuhnAlgorithm from './LuhnAlgorithm';

const cardWidget = new CardWidget(document.querySelector('.cards-widget'));
cardWidget.bindToDom();

const luhnAlgorithm = new LuhnAlgorithm(cardWidget);
luhnAlgorithm.initialize();
