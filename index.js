const http = require("http");
const fs = require("fs");
const url = require("url");
const sendTemplate = require("./sendTemplate");

const templateOverView = fs.readFileSync("./templates/overview.html", "utf-8");
const templateCards = fs.readFileSync("./templates/card.html", "utf-8");
const templateProduct = fs.readFileSync("./templates/product.html", "utf-8");
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

const cards = data.map((product) => {
  let output = templateCards.replace("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replace("{%QUANTITY%}", product.quantity);
  output = output.replace("{%PRICE%}", product.price);
  output = output.replace("{%ID%}", product.id);

  return output;
});

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(templateOverView.replace("{%PRODUCTCARDS%}", cards.join("")));
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(sendTemplate(templateProduct, data[query.id]));
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>No route found!</h1>");
  }
});

server.listen(4000, () => {
  console.log("Server is listening at 4000.......");
});
