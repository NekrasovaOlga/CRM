const createCategory = (err, data) => {
  const datalist = document.createElement('datalist');
  const labelCategory = document.querySelector('.modal__label_category');
  datalist.id = 'category-list';

  const options = data.map((item) => {
    const optionsItem = document.createElement('option');
    optionsItem.value = item;
    optionsItem.textContent = item;

    return optionsItem;
  });

  datalist.append(...options);

  labelCategory.after(datalist);
};

export default createCategory;
