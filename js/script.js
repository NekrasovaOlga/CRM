import cart from './modules/productList.js';
import {btnAdd, overlay, form, table} from './modules/getElement.js';
import totalSum from './modules/optionsRow.js';
import * as formOptions from './modules/initForm.js';
import * as elem from './modules/createElement.js';

const init = () => {
  elem.renderGoods(cart);
  const {closeForm, openForm} = formOptions.formInit(btnAdd, overlay);
  elem.removeRow(table);
  totalSum(cart);
  formOptions.formSubmit(form, closeForm, openForm);
};

init();
