import {overlay, form, overlayRemove} from './getElement.js';
import * as formOptions from './initForm.js';
import * as elem from './createElement.js';
import fetchRequest from './fetchRequest.js';

// открытие окна
const windowPicture = (createImg) => {
  const openWin = open('about:blank', '', 'width=600px, height=800px');
  const width = (screen.width - 600) / 2;
  const height = (screen.height - 800) / 2;
  openWin.moveBy(width, height);
  openWin.document.body.appendChild(createImg);
};

// открытие картинки в окне
const openPicture = (img) => {
  const createImg = document.createElement('div');
  createImg.style.cssText = `
      background: url('http://localhost:3000/${img}') no-repeat;
      background-size: contain;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      `;
  windowPicture(createImg);
};

const changeRow = (err, data) => {
  const formInit = form;
  formOptions.addFile(data.image);
  formInit.total.value = '$ ' + (data.price * data.count);
  formInit.title.value = data.title;
  formInit.count.value = data.count;
  formInit.description.value = data.description;
  formInit.price.value = data.price;
  formInit.units.value = data.units;
  if (data.discount) {
    formInit.discount.checked = true;
    formInit.discount_count.value = data.discount;
    formInit.discount_count.disabled = false;
  }
  formInit.category.value = data.category;
};

const createRow = ({
  id,
  count,
  category,
  discount,
  price,
  title,
  units,
  image}) => {
  const goodsTable = document.querySelector('.goods__table .table__body');

  const block = document.createElement('tr');
  const btnWrapper = document.createElement('td');

  btnWrapper.className = 'table__cell table__cell_btn-wrapper';

  const btnEdit = document.createElement('button');
  const btnRemove = document.createElement('button');
  const btnImage = document.createElement('button');

  btnEdit.className = 'table__btn table__btn_edit';
  btnRemove.className = 'table__btn table__btn_del';
  btnImage.className = 'table__btn table__btn_pic';

  btnImage.dataset.pic = image;

  btnImage.addEventListener('click', e => {
    openPicture(btnImage.dataset.pic);
  });

  btnEdit.addEventListener('click', async (e) => {
    formOptions.formInit(btnEdit, overlay, id, btnImage.dataset.pic);
    await fetchRequest(`goods/${id}`, {
      method: 'get',
      callback: changeRow,
    });
  });

  btnRemove.addEventListener('click', async e => {
    overlayRemove.classList.add('active');

    const btnRemoveForm = overlayRemove.querySelector('.modal__delete__goods');
    overlayRemove.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.modal') || target.closest('.modal__close')) {
        overlayRemove.classList.remove('active');
      }
    });

    btnRemoveForm.addEventListener('click', async e => {
      await fetchRequest(`goods/${id}`, {
        method: 'DELETE',
      });

      block.remove();
      overlayRemove.classList.remove('active');
    });
  });
  const sum = price - (price * (discount / 100));
  const elem = `
    <td class='table__cell'>${id}</td>
    <td class='table__cell table__cell_left table__cell_name' data-id='${id}'>
      <span class='table__cell-id'>id: ${id}</span>
      ${title}</td>
    <td class='table__cell table__cell_left'>${category}</td>
    <td class='table__cell'>${discount}%</td>
    <td class='table__cell'>${units}</td>
    <td class='table__cell'>${count}</td>
    <td class='table__cell'>$${price}</td>
    <td class='table__cell'>$${Math.ceil(sum * count)}</td>`;

  btnWrapper.append(btnImage, btnEdit, btnRemove);
  block.insertAdjacentHTML('beforeend', elem);
  block.append(btnWrapper);

  goodsTable.append(block);
};


const renderGoods = (err, cart) => {
  cart.map(elem.createRow);
};

export {
  createRow,
  renderGoods,
};
