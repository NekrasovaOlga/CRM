import totalSum from './optionsRow.js';
import * as elem from './createElement.js';
import cart from './productList.js';

const createRow = ({id, count, subTotal, price, title, units}) => {
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
      <button class='table__btn table__btn_pic'></button>
      <button class='table__btn table__btn_edit'></button>
      <button class='table__btn table__btn_del'></button>
    </td>
  </tr>`;

  goodsTable.insertAdjacentHTML('beforeend', elem);
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
  });
};
const renderGoods = (cart) => {
  cart.map(elem.createRow);
};

export {
  createRow,
  removeRow,
  renderGoods,
};
