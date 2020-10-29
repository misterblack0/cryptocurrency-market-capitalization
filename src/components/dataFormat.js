// Format data in a currency value for the price, with fraction digits ---------work in progress----------

export const priceFormat = (num) => {
  const options = {
    style: "currency",
    currency: "USD",
    /* maximumFractionDigits: 6, */
  };
  return new Intl.NumberFormat("en-US", options).format(num);
};

// Format data in a currency value

export const currencyFormat = (num) => {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return new Intl.NumberFormat("en-US", options).format(num);
};

// Format data in a percentage value

export const percentageFormat = (num) => {
  const options = { style: "percent", minimumFractionDigits: 2 };
  // num < 0 ? to implement red color style on "< 0" number and green on "0 >" number
  return (num / 100).toLocaleString("en-US", options);
};

// Format data in a number value with a minimum number of significant digits

export const numberFormat = (num) => {
  const options = { maximumFractionDigits: 0 };
  return new Intl.NumberFormat("en-US", options).format(num);
};
