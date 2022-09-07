'use strict';

const cart = [
  {
    "id": 1,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 2,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 3,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 4,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "шт",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
]

{


const createRow = ({id, count, description, discont, price, title, units}) => {
    const goods__table = document.querySelector('.goods__table .table__body');
    
    const elem = `<tr>
    <td class="table__cell">${id}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
      <span class="table__cell-id">id: ${id}</span>
      ${title}</td>
    <td class="table__cell table__cell_left">Техника для дома</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell"></td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  </tr>`

  goods__table.insertAdjacentHTML('beforeend', elem)
}
const renderGoods = cart => {
    const sortRow = cart.map(createRow)
}
const formInit = (btnAdd, overlay) => {
  const openForm = () => {
    overlay.classList.add('active'); 
  };

  const closeForm = () => {
    overlay.classList.remove('active');
  }

  btnAdd.addEventListener('click', () => {
    const codeId =  document.querySelector('.vendor-code__id');
    const randowId = Math.round(Math.random() * 1000000);
    codeId.textContent = randowId
    openForm()
  })

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if(!target.closest('.modal') || target.closest('.modal__close')){
      closeForm()
    }
  })

  return {
    closeForm,
    openForm,
  }
}

const removeRow = (list) => {
    list.addEventListener('click', (event) => {    
    if(event.target.closest('.table__btn_del')){
      const idRow = +event.target.closest('tr').firstElementChild.textContent;
      const indexRow =  cart.findIndex(elem => elem.id == idRow)
      const cartDelet = cart.splice(indexRow, 1)
      event.target.closest('tr').remove()
    }
    totalSum(cart)
    })
}
const totalSum = (cartTotal) => {
 const oldSum = document.querySelector('.cms__total-price');
 const newSum = cartTotal.reduce((initialValue, currentItem) => {
  return +currentItem.price + initialValue
 }, 0);

 oldSum.textContent = `$ ${newSum}`
}

const formSubmit = (form, closeForm) => {
  form.total.value = 0
  form.addEventListener('change', e => {
    let totalPrice;
    if(form.discount.checked){
      form.discount_count.disabled = false
      totalPrice = form.price.value - (form.price.value * (form.discount_count.value/100))
    } else {
      form.discount_count.value = ''
      form.discount_count.disabled = true
      totalPrice =  form.price.value
    }
    form.total.value = '$ ' + totalPrice
  })

 form.addEventListener('submit', e => {
  e.preventDefault();

  const codeId =  document.querySelector('.vendor-code__id');
  const formData = new FormData(e.target);
  const newItem = Object.fromEntries(formData);

  newItem.id = codeId.textContent;
  createRow(newItem)
  cart.push(newItem)

  form.reset();
  closeForm();

  totalSum(cart);
 })
}
    const init = () => {
    const btnAdd = document.querySelector('.panel__add-goods');
    const overlay = document.querySelector('.overlay');
    const form = document.querySelector('.modal__form');
    const table = document.querySelector('.table');
    overlay.classList.remove('active'); 

    const goods = renderGoods(cart);

    const {closeForm, openForm} = formInit(btnAdd, overlay);
    removeRow(table)
    totalSum(cart)
    formSubmit(form, closeForm, openForm);

  }
  init()
}