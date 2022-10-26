const totalSum = (err, cartTotal) => {
  const oldSum = document.querySelector('.cms__total-price');
  const newSum = cartTotal.reduce(
      (initialValue, currentItem) => {
        const sum = currentItem.price -
        (currentItem.price * (currentItem.discount / 100));
        return (sum * currentItem.count) + initialValue;
      },
      0);

  oldSum.textContent = `$ ${Math.ceil(newSum)}`;
};

export default totalSum;
