const chai = require ('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleProductController } = require("../../../src/controllers");
const { saleMock } = require("../mocks");
const httpStatus = require("../../../src/utils/httpStatus");
const { saleProductService } = require("../../../src/services");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade para saleProductController", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Verifica se é inserida uma nova venda com sucesso", async function () {
    const res = {};
    const req = {};

    const output = saleMock.insertProdu;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "insert").resolves({
      type: null,
      message: output,
    });

    await saleProductController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(output);
  });

//  it("Verifica se falha ao inserir uma nova venda sem productId", async function () {
//   const res = {};
//   const req = {};

//   const output = {
//     type: "VALUE_REQUIRED",
//     message: '"productId" is required',
//   };

//   res.status = sinon.stub().returns(res);
//   res.json = sinon.stub().returns();

//   sinon.stub(saleProductController, "insert").resolves(output);

//   await saleProductController.insert(req, res);

//   expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
//   expect(res.json).to.have.been.calledWith({ message: output.message });
//   });

it("Verifica se obtém todas as vendas com sucesso", async function () {
const res = {};
const req = {};

const output = {
  type: null,
  message: saleMock.insertProdu,
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon.stub(saleProductService, "getAll").resolves(output);

await saleProductController.getAll(req, res);

expect(res.status).to.have.been.calledWith(httpStatus.OK);
expect(res.json).to.have.been.calledWith(output.message);
});

it("Verifica se falha ao encontrar venda por id se ela não existir", async function () {
  const res = {};
  const req = {
    params: { id: 9999 }
  };

  const output = {
    type: 'SALE_NOT_FOUND',
    message: 'Sale not found',
  };

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  sinon.stub(saleProductService, "findById").resolves(output);

  await saleProductController.findById(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
  expect(res.json).to.have.been.calledWith({ message: output.message });
});

it("Verifica se encontra uma venda por id com sucesso", async function () {
const res = {};
const req = {
  params: { id: 1}
};

const output = {
  type: null,
  message: saleMock.successFind,
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();
sinon.stub(saleProductService, "findById").resolves(output);

await saleProductController.findById(req, res);

expect(res.status).to.have.been.calledWith(httpStatus.OK);
expect(res.json).to.have.been.calledWith(output.message);
});

//  it("Verifica se é removida uma venda com sucesso", async function () {
//   const res = {};
//   const req = {
//     params: { id: 1 }
//   };

//   res.status = sinon.stub().returns(res);
//   res.end = sinon.stub().returns();

//   sinon.stub(saleProductService, "remove").resolves({ type: null, message: '' });

//   await saleProductController.remove(res, req);

//   expect(res.status).to.have.been.calledWith(httpStatus.NO_CONTENT);
//   expect(res.end).to.have.been.calledWith();
// }); 

 it("Verifica se falha ao remover venda que não existe", async function () {
  const res = {};
  const req = {
    params:{ id: 999 }
  };

  const output = {
    type: 'SALE_NOT_FOUND',
    message: 'Sale not found'
  }

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  sinon.stub(saleProductService, "remove").resolves(output);

  await saleProductController.remove(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
  expect(res.json).to.have.been.calledWith({ message: output.message });
}); 

it("Verifica se venda feita com sucesso é atualizada", async function () {
  const res = {};
  const req = {
    params: 1
  };

  const output = saleMock.updateRight

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  sinon.stub(saleProductService, "update").resolves({
    type: null, 
    message: output,
  });

  await saleProductController.update(req, res);

  expect(res.status).to.have.been.calledWith(httpStatus.OK);
  expect(res.json).to.have.been.calledWith(output);
});
//  it("Verifica se breka ao realizar venda que  não existe", async function () {
//   const res = {};
//   const req = {
//     params: 1
//   };

//   const output = {
//     type: 'SALE_NOT_FOUND',
//     message: 'Sale not found'
//   }

//   res.status = sinon.stub().returns(res);
//   res.json = sinon.stub().returns();

//   sinon.stub(saleProductController, "update").resolves(output);

//   await saleProductController.update(req, res);

//   expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
//   expect(res.json).to.have.been.calledWith({ message:output.message });
//   }); 
}); 