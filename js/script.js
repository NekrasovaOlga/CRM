
import {btnAdd, overlay} from './modules/getElement.js';
import * as formOptions from './modules/initForm.js';
import * as elem from './modules/createElement.js';
import fetchRequest from './modules/fetchRequest.js';
import totalSum from './modules/optionsRow.js';
import createCategory from './modules/category.js';


const init = async () => {
  await fetchRequest('goods', {
    method: 'get',
    callback: elem.renderGoods,
  });

  await fetchRequest('goods', {
    method: 'get',
    callback: totalSum,
  });

  await fetchRequest('category', {
    method: 'get',
    callback: createCategory,
  });

  btnAdd.addEventListener('click', (e) => {
    formOptions.formInit(btnAdd, overlay);
  });

  formOptions.formSearch();
};

init();
