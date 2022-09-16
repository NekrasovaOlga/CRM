import totalSum from './optionsRow.js';
import * as elem from './createElement.js';
import cart from './productList.js';

const createRow = ({id, count, subTotal, price, title, units, images}) => {
  const goodsTable = document.querySelector('.goods__table .table__body');

  const elem = `<tr>
    <td class='table__cell'>${id}</td>
    <td class='table__cell table__cell_left table__cell_name' data-id='${id}'>
      <span class='table__cell-id'>id: ${id}</span>
      ${title}</td>
    <td class='table__cell table__cell_left'>Техника для дома</td>
    <td class='table__cell'>${units}</td>
    <td class='table__cell'>${count}</td>
    <td class='table__cell'>$${price}</td>
    <td class='table__cell'>$${subTotal}</td>
    <td class='table__cell table__cell_btn-wrapper'>
    <button class='table__btn table__btn_pic' data-pic="${images.big}"></button>
      <button class='table__btn table__btn_edit'></button>
      <button class='table__btn table__btn_del'></button>
    </td>
  </tr>`;

  goodsTable.insertAdjacentHTML('beforeend', elem);
};

const elemCalculation = (cart) => {
  const table = document.querySelectorAll('.table .table__body tr ');
  for (let i = 0; i < cart.length; i++) {
    cart[i].id = i + 1;
    table[i].firstElementChild.textContent = i + 1;
    table[i].querySelector('.table__cell-id').textContent = `id: ${i + 1}`;
  }
};

const removeRow = (list) => {
  list.addEventListener('click', (event) => {
    if (event.target.closest('.table__btn_del')) {
      const idRow = +event.target.closest('tr').firstElementChild.textContent;
      const indexRow = cart.findIndex((elem) => elem.id === idRow);
      const cartDelet = cart.splice(indexRow, 1);
      event.target.closest('tr').remove();
    }
    totalSum(cart);
    elemCalculation(cart);
  });
};
// открытие окна
const windowPicture = (createImg) => {
  const openWin = open('about:blank', '', 'width=600px, height=800px');
  const width = (screen.width - 600) / 2;
  const height = (screen.height - 800) / 2;
  openWin.moveBy(width, height);
  openWin.document.body.appendChild(createImg);
};

// открытие картинки в окне
const openPicture = (list) => {
  list.addEventListener('click', e => {
    if (e.target.closest('.table__btn_pic')) {
      const imgUrl = e.target.closest('.table__btn_pic').dataset.pic;
      const createImg = document.createElement('div');
      createImg.style.cssText = `
      background: url('${imgUrl}') no-repeat;
      background-size: contain;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      `;
      windowPicture(createImg);
    }
  });
};

const renderGoods = (cart) => {
  cart.map(elem.createRow);
};

export {
  createRow,
  removeRow,
  openPicture,
  renderGoods,
};
