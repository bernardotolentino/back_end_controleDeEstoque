const insertIdSale = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const insertProdu = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const noProductId = [{ quantity: 1 }];

const insertWrongProductId = [{ productId: 0,_quantity: 1,
get quantity() {
    return this._quantity;
  },
set quantity(value) {
    this._quantity = value;
  },
 }];

const insertQuantNul = [{ productId: 1 }];

const wrongQuantyMock = [{ productId: 1, quantity: 0 }];

const successFind = [
  {
    date: "2023-04-17T13:31:59.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2023-03-17T13:31:59.000Z",
    productId: 2,
    quantity: 2,
  },
];

const getAllSalesM = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const updSalesMock = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const UpdateWrong = [
  {
    productId: 999,
    quantity: 10,
  },
  {
    productId: 999,
    quantity: 50,
  },
];

const updateRight = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

module.exports = {
  insertProdu,
  insertIdSale,
   noProductId,
   successFind,
   insertQuantNul,
   wrongQuantyMock,
   insertWrongProductId,
   getAllSalesM,
   updSalesMock,
   updateRight,
   UpdateWrong
};