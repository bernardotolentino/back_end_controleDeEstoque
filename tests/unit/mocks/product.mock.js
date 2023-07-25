const getAllProduct = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const insertProdMock = {
  id: 4,
  name: "relogio ben10",
};

const updateProdMock = {
  id: 1,
  name: "Martelo do chapolin",
};

const updateNameMock = {
  name: "power range",
};

const searchMock = [{id:1, name:'Martelo de Thor'}];

module.exports = {
  getAllProduct,
   insertProdMock,
   updateProdMock,
   updateNameMock,
  searchMock,
};