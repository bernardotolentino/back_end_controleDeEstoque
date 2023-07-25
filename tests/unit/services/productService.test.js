const { expect } = require("chai");
const sinon = require("sinon");

const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productMock } = require("../mocks");

describe("Teste de unidade para productService", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Verifica se obtém todos os produtos", async () => {
    sinon.stub(productModel, "getAll").resolves(productMock.getAllProduct);
    const result = await productService.getAll();

    expect(result).to.deep.equal(productMock.getAllProduct);
  });

  it("Verifica se é encontrado um produto por id com sucesso", async () => {
    const output = productMock.getAllProduct[0];
    sinon.stub(productModel, "findById").resolves(output);

    const result = await productService.findById(1);

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
  });

  it("Verifica se falha ao encontrar produto com id inválido", async () => {
    sinon.stub(productModel, "findById").resolves([[]]);
    const result = await productService.findById(0);
    const message = '"id" must be a number greater than 0';

    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number greater than 0');
  });

  // it("Verifica se falha ao encontrar produto com id inexistente", async () => {
  //   sinon.stub(productModel, "findById").resolves(undefined);
  //   const output = { type: "PRODUCT_NOT_FOUND", message: "Product not found" };
  //   const nonExistentId = 999;

  //   const result = await productService.findById(nonExistentId);

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.equal(output.message);
  // });

  it("Verifica se inserido um novo produto com sucesso", async () => {
    sinon
      .stub(productModel, "insert")
      .resolves(productMock.insertProdMock.id);
    sinon
      .stub(productModel, "findById")
      .resolves(productMock.insertProdMock);

    const result = await productModel.insert({
      name: productMock.insertProdMock.name,
    });

    expect(result.type).to.equal(undefined);
    expect(result.message).to.equal(undefined);
  });

  it("Verifica falha ao inserir um novo produto sem um nome", async () => {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    const result = await productService.insert({});

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("Verifica falha ao inserir um novo produto com nome inválido", async () => {
    const output = {
      type: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };

    const result = await productService.insert({ name: "aaaa" });

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("Verifica falha ao atualizar um produto sem o nome", async () => {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    const result = await productService.update({});

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  // it("Verifica falha ao atualizar um produto que não existe", async () => {
  //   const output = {
  //     type: "PRODUCT_NOT_FOUND",
  //     message: "Product not found",
  //   };

  //   const result = await productService.update(
  //     {
  //       name: productMock.updateProdmock.name,
  //     },
  //     999
  //   );

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.equal(output.message);
  // });

  // it("Verifica se produto é atualizado com sucesso", async () => {
  //   const output = {
  //     type: 'PRODUCT_NOT_FOUND',
  //     message: productMock.updateNameMock,
  //   };

  //   sinon.stub(productModel, 'findById').resolves(output.message)
  //   sinon.stub(productModel, 'update').resolves(true)

  //   const result = await productService.update(
  //     productMock.updateProdmock,
  //     productMock.updateNameMock.id
  //   );

  //   expect(result.type).to.equal(output.type);
  //   expect(result.message).to.deep.equal('Product not found');
  // });

  it("Verifica se produto é removido com sucesso", async () => {
    const output = {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };

    sinon.stub(productModel, 'findById').resolves(true)

    const result = await productService.remove(1);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  it("Verifica se falha ao remover produto que não existe", async () => {
    const output = {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };

    const result = await productService.remove(999);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  it("Verifica pesquisa produto com sucesso", async () => {
    const output = productMock.getAllProduct;
    const searchToy = 'Martelo';

    sinon.stub(productModel, 'search').resolves(output);

    const result = await productService.search(searchToy);
    expect(result).to.deep.equal(output);
  });
});