import {form, table, images, modalErr} from './getElement.js';
import totalSum from './optionsRow.js';
import * as elem from './createElement.js';
import fetchRequest from './fetchRequest.js';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', (err) => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });

const addFile = (src) => {
  images.src = src;
  return src;
};

const fileChange = (file) => {
  const buttonSumbit = document.querySelector('.modal__goods-submit');
  const err = document.querySelector('.err');
  if (file.isDefaultNamespace.length > 0 && file.files[0].size <= 1000000) {
    const src = URL.createObjectURL(file.files[0]);
    err.style.display = 'none';
    buttonSumbit.disabled = false;
    images.src = src;
  } else {
    images.src = '';
    buttonSumbit.disabled = true;
    err.style.display = 'block';
  }
};

const falseModal = (err, data) => {
  if (err !== null) {
    modalErr.classList.add('active');
  } else {
    fetchRequest('goods', {
      method: 'get',
      callback: totalSum,
    });
    elem.createRow(data);
  }

  modalErr.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.modal__close')) {
      modalErr.classList.remove('active');
    }
  });
  
  return false;
};

const formSubmit = (form, closeForm, status, idGood, imagePic) => {
  const titleForm = document.querySelector('.modal__title__form');
  if (idGood) {
    titleForm.textContent = 'Изменить товар';
  } else {
    titleForm.textContent = 'Добавить товар';
  }
  const file = document.querySelector('.modal__file');
  file.addEventListener('change', async (e) => {
    fileChange(file);
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

    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData);

    const data = {
      title: newItem.title,
      description: newItem.description,
      price: newItem.price,
      category: newItem.category,
      discount: !newItem.discount ? 0 : newItem.discount_count,
      count: newItem.count,
      units: newItem.units,
    };

    if (newItem.image.name !== '') {
      const resultImg = await toBase64(newItem.image);
      data.image = resultImg;
    } else {
      data.image = imagePic;
    }

    const link = idGood ? `goods/${idGood}` : 'goods';
    const result = await fetchRequest(link, {
      method: status,
      body: data,
      callback: falseModal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(result);

    if (result) {
      closeForm();
      form.reset();
    }
  });
};

const formInit = (btnAdd, overlay, id, btnImage) => {
  const openForm = () => {
    overlay.classList.add('active');
  };

  const closeForm = () => {
    overlay.classList.remove('active');
    form.reset();
    images.src = '';
  };
  openForm();


  if (btnAdd.classList.contains('panel__add-goods')) {
    formSubmit(form, closeForm, 'post');
  } else {
    formSubmit(form, closeForm, 'PATCH', id, btnImage);
  }

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

const formSearch = () => {
  const searchInput = document.querySelector('.panel__input');
  searchInput.addEventListener('input', () => {
    setTimeout(() => {
      table.innerHTML = '';
      fetchRequest(`goods?search=${searchInput.value}`, {
        method: 'get',
        callback: elem.renderGoods,
      });
    }, 300);
  });
};

export {formInit, formSubmit, addFile, formSearch};
