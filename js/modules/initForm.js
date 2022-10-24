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
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', err => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

const formSubmit = (form, closeForm) => {
  const file = document.querySelector('.modal__file');
  const preview = document.querySelector('.preview');
  const image = new Image();
  const buttonSumbit = document.querySelector('.modal__submit');
  const err = document.createElement('div');

  file.addEventListener('change', async e => {
    if (file.isDefaultNamespace.length > 0 && file.files[0].size <= 1000000) {
      preview.style.width = '60px';
      const src = URL.createObjectURL(file.files[0]);
      err.style.display = 'none';
      buttonSumbit.disabled = false;
      if (!preview.classList.contains('active')) {
        image.src = src;
        preview.classList.add('active');
        preview.append(image);
      } else {
        image.src = src;
      }
    } else {
      preview.style.width = '100%';
      buttonSumbit.disabled = true;
      image.src = '';
      err.textContent = 'Изображение не должно превышать размер 1 МБ';
      err.style.color = 'red';
      err.style.fontSize = '18px';
      err.style.display = 'block';
      preview.append(err);
    }
  });

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const codeId = document.querySelector('.vendor-code__id');
    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData);
    const resultImg = await toBase64(newItem.image);
    newItem.images = {
      big: resultImg,
    };
    const subtotal = newItem.price * newItem.count;
    newItem.subTotal = !newItem.discount ? subtotal :
    subtotal - subtotal * (newItem.discount_count / 100);
    newItem.id = codeId.textContent;
    console.log(newItem);
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
