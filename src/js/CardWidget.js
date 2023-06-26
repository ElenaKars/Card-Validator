import CardValidator from './CardValidator';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cardTypes = ['visa', 'mastercard', 'mir', 'american-express', 'discover', 'jcb'];
  }

  static get markup() {
    return `
        <ul class="cards"></ul>
        <form id="form">
        <input class="input" type="text" placeholder="Credit card number">
        <button class="button">Click to Validate</button>
        </form>
        `;
  }

  bindToDom() {
    this.parentEl.insertAdjacentHTML('beforeend', CardWidget.markup);

    this.ul = this.parentEl.querySelector('.cards');
    this.input = this.parentEl.querySelector('.input');

    this.cardTypes.forEach((card) => {
      const li = document.createElement('li');
      li.classList.add('card', card);
      li.setAttribute('title', card);
      this.ul.append(li);
    });

    this.CardValidator = new CardValidator();

    this.input.addEventListener('input', () => this.CardValidator.checkCard(this.input.value));
  }

  msgStatus(text) {
    this.form = document.getElementById('form');
    this.clearMsg();
    const msg = document.createElement('p');
    if (text === 'empty') {
      msg.classList.add('error-msg');
      msg.textContent = 'Введите номер карты';
    }
    if (text === 'wrong-number') {
      msg.classList.add('error-msg');
      msg.textContent = 'Неверное количество цифр в номере карты';
    }
    if (text === 'wrong-card') {
      msg.classList.add('error-msg');
      msg.textContent = `Ошибка! Номер карты неверен!\nТип карты: ${this.cardValidator.showType()}`;
    }
    if (text === 'correct-card') {
      msg.classList.add('success-msg');
      msg.textContent = `Проверка прошла успешно!\nТип карты: ${this.cardValidator.showType()}`;
    }
    this.form.insertAdjacentElement('afterend', msg);
  }

  clearMsg() {
    const removeEl = this.form.nextElementSibling;
    if (removeEl) {
      removeEl.remove();
    }
  }
}
