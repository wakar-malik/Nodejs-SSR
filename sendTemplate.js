module.exports = (temp, product) => {
  let output = temp.replaceAll("{%IMAGE%}", product.image);
  output = output.replace("{%DESCRIPTION%}", product.description);
  output = output.replace("{%PRODUCTNAME%}", product.productName);
  output = output.replace("{%QUANTITY%}", product.quantity);
  output = output.replace("{%FROM%}", product.from);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replace("{%NUTRIENTS%}", product.nutrients);

  return output;
};
