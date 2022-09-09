const totalSum = (cartTotal) => {
  const oldSum = document.querySelector('.cms__total-price');
  const newSum = cartTotal.reduce(
      (initialValue, currentItem) => +currentItem.subTotal + initialValue,
      0);

  oldSum.textContent = `$ ${newSum}`;
};

export default totalSum;
