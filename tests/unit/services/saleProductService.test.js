const { expect } = require("chai");
const sinon = require("sinon");

const { saleProductModel, productModel } = require("../../../src/models");
const { saleProductService, productService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe("Teste de unidade para saleProductService", function () {
    afterEach(function () {
    sinon.restore();
  });

  it("Verifica se nova venda é inserida com sucesso", async function () {
    const output = saleMock.insertProdu;
    sinon.stub(productModel, "findById").resolves(true);
    sinon.stub(saleProductModel, "insert").resolves(output.id);

    const result = await saleProductService.insert(
      saleMock.insertProdu
    );

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
  });

  it("Verifica se falha ao inserir uma nova venda sem productId", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"productId" is required',
    };

    const result = await saleProductService.insert(
      saleMock.noProductId
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  // it("Verifica se falha ao inserir uma nova venda se um produto na lista não existir", async function () {
  //   const output = {
  //     type: "PRODUCT_NOT_FOUND",
  //     message: "Product not found",
  //   };

  //   const result = await saleProductService.insert(
  //     saleMock.insertWrongProductId
  //   );

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.equal(output.message);
  // });

  it("Verifica se falha ao inserir uma nova venda sem quantidade", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"quantity" is required',
    };

    const result = await saleProductService.insert(
      saleMock.insertQuantNul
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  // it("Verifica se falha ao inserir uma nova venda com quantidade menor ou igual a zero", async function () {
  //   const output = {
  //     type: "INVALID_VALUE",
  //     message: '"quantity" must be greater than or equal to 1',
  //   };

  //   const result = await saleProductService.insert(
  //     saleMock.insertQuantNul
  //   );

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.equal(output.message);
  // });

 

  it("Verifica se remove uma venda com sucesso", async function () {
    sinon.stub(saleProductModel, "findById").resolves(true);
    sinon.stub(saleProductModel, "remove").resolves(true);

    const result = await saleProductService.remove(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal("");
  });
  
  it("Verifica se falha ao remover uma venda que não existe", async function () {
    const output = {
      type: "SALE_NOT_FOUND",
      message: "Sale not found"
    };

    sinon.stub(saleProductService, "findById").resolves(output);

    const result = await saleProductService.remove(999);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });
  it("Verifica se da error com uma venda inexistente", async function () {
    const output = {
      type: "SALE_NOT_FOUND",
      message: "Sale not found",
    };
    sinon.stub(saleProductModel, "findById").resolves([]);

    const MAGIC_NUMBER = 6969;
    const result = await saleProductService.findById(MAGIC_NUMBER);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("Verifica se retorna erro com um id 0 ou invalido", async function () {
    const output = {
      type: "INVALID_VALUE",
      message: '"id" must be a number greater than 0',
    };

    sinon.stub(saleProductModel, "findById").resolves(undefined);

    const result = await saleProductService.findById(0);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("Verifica se encontra venda por id com sucesso", async function () {
    const output = saleMock.insertIdSale;

    sinon.stub(saleProductModel, "findById").resolves(output);

    const result = await saleProductService.findById(output.id);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(output);
  });

  it("Verifica se obtém todas as vendas com sucesso", async function () {
    const output = saleMock.getAllSalesM;

    sinon.stub(saleProductModel, "getAll").resolves(output);

    const result = await saleProductService.getAll();

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(output);
  });

  it("Verifica se atualiza uma venda com sucesso", async function () {
    const output = {
      type: null,
      message: saleMock.updateRight,
    };

    sinon
      .stub(saleProductService, "findById")
      .resolves({ type: null, message: "" });

    sinon.stub(productService, "findById").resolves(false);
    sinon.stub(saleProductModel, "update").resolves(true);

    const result = await saleProductService.update(
      saleMock.updSalesMock,
      1
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  // it("Verifica se deixa de atualizar uma venda que não existe", async function () {
  //   const output = {
  //     type: "SALE_NOT_FOUND",
  //     message: "Sale not found",
  //   };

  //   sinon
  //     .stub(saleProductService, "findById")
  //     .resolves(false);

  //   sinon.stub(saleProductModel, "update").resolves();

  //   const aleatory = 0
  //   const result = await saleProductService.update(
  //     saleMock.updSalesMock,
  //     aleatory
  //   );

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.deep.equal(output.message);
  // });

  // it("Verifica se deixa de atualizar uma venda com o produto que não  existe", async function () {
  //   const output = {
  //     type: 'PRODUCT_NOT_FOUND',
  //     message: 'Product not found'
  //   };

  //   sinon
  //     .stub(saleProductService, "findById")
  //     .resolves(false);

  //   sinon.stub(productService, "findById").resolves(output);

  //   const MAGIC_NUMBER = 1
  //   const result = await saleProductService
  //   .update(saleMock.UpdateWrong,MAGIC_NUMBER);

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.deep.equal(output.message);
  // });
});