import totalSum from './optionsRow.js';
import * as elem from './createElement.js';
import cart from './productList.js';

const formInit = (btnAdd, overlay) => {
  const openForm = () => {
    overlay.classList.add('active');
  };

  const closeForm = () => {
    overlay.classList.remove('active');
  };

  btnAdd.addEventListener('click', () => {
    const codeId = document.querySelector('.vendor-code__id');
    const lastElemCart = cart[cart.length - 1].id;
    codeId.textContent = +lastElemCart + 1;
    openForm();
  });

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.modal') || target.closest('.modal__close')) {
      closeForm();
    }
  });

  return {
    closeForm,
    openForm,
  };
};

const formSubmit = (form, closeForm) => {
  form.total.value = 0;
  form.addEventListener('change', (e) => {
    let totalPrice;
    if (form.discount.checked) {
      form.discount_count.disabled = false;
      totalPrice =
        (+form.price.value -
          +form.price.value * (form.discount_count.value / 100)) *
        +form.count.value;
    } else {
      form.discount_count.value = '';
      form.discount_count.disabled = true;
      totalPrice = +form.price.value * +form.count.value;
    }
    form.total.value = '$ ' + totalPrice;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const codeId = document.querySelector('.vendor-code__id');
    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData);
    const subtotal = newItem.price * newItem.count;
    newItem.subTotal = !newItem.discount ? subtotal :
    subtotal - subtotal * (newItem.discount_count / 100);
    newItem.id = codeId.textContent;
    elem.createRow(newItem);
    cart.push(newItem);

    form.reset();
    closeForm();

    totalSum(cart);
  });
};

export {
  formInit,
  formSubmit,
};
