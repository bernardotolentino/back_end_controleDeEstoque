const chai = require ('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productMock } = require('../mocks');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const httpStatus = require('../../../src/utils/httpStatus');

describe ("Testes de unidade para productController", async function() {
  afterEach(function () {
    sinon.restore();
  });

  it("Verifica se existem todos os produtos", async function () {
    const res = {};
    const req = {};

    const output = productMock.getAllProduct;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "getAll").resolves(output);

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output);
  });

  it("Verifica se encontra o produto por id com sucesso", async function () {
    const res = {};
    const req = { params: { id: 1 } };

    const output = {
      type: null,
      message: productMock.getAllProduct[0],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "findById").resolves(output);

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output.message);
  });

  it("Verifica se falha ao encontrar o produto por id", async function() {
    const res = {};
    const req = { params: { id: 0 } };

    const output = {
      type: "PRODUCT_NOT_FOUND",
      message: "Product not found",
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "findById").resolves(output);

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: output.message });
  });

  it("Verifica se é inserido um novo produto com sucesso", async function () {
    const res = {};
    const req = {
      body: {
        name: productMock.insertProdMock.name,
      },
    };

    const output = {
      type: null,
      message: productMock.insertProdMock,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "insert").resolves(output);

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(output.message);
  });

  it("Verifica se falha ao inserir um novo produto sem um nome", async function () {
    const res = {};
    const req = {
      body: {},
    };

    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "insert").resolves(output);

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({ message: output.message });
  });

  it("Verifica se falha ao inserir um novo produto com um nome inválido", async function () {
    const res = {};
    const req = {
      body: { name: "aaaa"},
    };

    const output = {
      type: "INVALID_VALUE",
      message: '"name" length must be at least 5 characters long',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "insert").resolves(output);

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.UNPROCESSABLE_ENTITY);
    expect(res.json).to.have.been.calledWith({ message: output.message });
  });

  it("Verifica se falha ao atualizar um produto sem um nome", async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: {}
    };

    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "update").resolves(output);

    await productController.update(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({ message: output.message });
  });

  // it("Verifica se falha ao atualizar um produto com nome inválido")
  // const res = {};
  // const req = {
  //   params: { id: 1 },
  //   body: { name: "" }
  // };

  const output = {
    type: "INVALID_VALUE",
    message: '"name" length must be at least 5 characters long',
  };

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  sinon.stub(productService, "update").resolves(output);

  await productController.update(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.UNPROCESSABLE_ENTITY);
  expect(res.json).to.have.been.calledWith({ message: output.message });
});

it("Verifica se remove um produto com sucesso", async function() {
  const res = {};
  const req = {
    params: {id: 1},
  };

  const output = {
    type: null,
    message: '',
  };

  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns();
  
  sinon.stub(productService, "remove").resolves(output);

  await productController.remove(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.NO_CONTENT);
  expect(res.send).to.have.been.calledWith();
});


it("Verifica se pesquisa o produto com sucesso", async function () {
  const res = {};
  const req = { query: {q: 'Martelo'}};

  const output = productMock.searchResponseWithSuccess

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  sinon.stub(productService, "search").resolves(output);

  await productController.search(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.OK);
  expect(res.json).to.have.been.calledWith(output);
});