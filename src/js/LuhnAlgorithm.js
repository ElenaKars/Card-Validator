export default class LuhnAlgorithm {
  constructor(widget) {
    this.widget = widget;
    this.input = document.querySelector('.input');
    this.form = document.getElementById('form');
    this.validateNumber = this.validateNumber.bind(this);
  }

  initialize() {
    this.form.addEventListener('submit', this.validateNumber);
  }

  validateNumber(e) {
    e.preventDefault();
    const { value } = this.input;

    if ((value.length === 19 || value.length >= 13) && (value.length <= 16)) {
      // Контрольная цифра (последняя)
      const checkNum = Number(value[value.length - 1]);
      // Вычисленная контрольная цифра
      const checkNumComputed = this.calcCheckNum(value);

      if (checkNumComputed === checkNum) {
        this.widget.msgStatus('correct-card');
      } else {
        this.widget.msgStatus('wrong-card');
      }
    } else if (value.length === 0) {
      this.widget.msgStatus('empty');
    } else {
      this.widget.msgStatus('wrong-number');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  calcCheckNum(value) {
    // Отделяем остальные цифры от контрольной; образуем массив из этих цифр;
    // переворачиваем массив; преобразуем каждый элемент массива в число
    const invertedArr = value.slice(0, value.length - 1).split('').reverse().map(Number);

    // Умножаем цифры в нечетных позициях массива на 2
    invertedArr.forEach((item, i) => {
      if (i === 0 || i % 2 === 0) {
        invertedArr[i] = item * 2;
      }
    });

    // Вычитаем 9 из чисел больше 9
    invertedArr.forEach((item, i) => {
      if (item > 9) {
        invertedArr[i] = item - 9;
      }
    });

    // Складываем все числа в массиве
    const sum = invertedArr.reduce((acc, item) => acc + item);

    // Вычисляем контрольную цифру: 10 - (sum mod 10)
    return 10 - (sum % 10);
  }
}
