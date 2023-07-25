const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/connection");
const { productMock } = require("../mocks");

describe("Testes de unidade para productModel", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Verifica se obtem todos os produtos com sucesso", async () => {
    const output = productMock.getAllProduct;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await productModel.getAll();
    expect(result).to.deep.equal(output);
  });

  it("Verifica se encontra o produto por id com sucesso", async () => {
    const output = productMock.getAllProduct[0];
    sinon.stub(connection, "execute").resolves([output]);
    const result = await productModel.findById(1);
    expect(result).to.deep.equal(output);
  });

  it("Verifica se é inserido um novo produto com sucesso", async () => {
    const output = productMock.insertProdMock;
    sinon
      .stub(connection, "execute")
      .resolves([{ insertId: productMock.insertProdMock.id }]);
    const result = await productModel.insert(productMock.insertProdMock);
    expect(result).to.equal(output.id);
  });

  it("Verifica se produto é atualizado com sucesso", async () => {
    const output = productMock.updateProdMock;
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await productModel.update(
      productMock.updateNameMock,
      output.id
    );
    expect(result).to.equal(output.id);
  });

  it("Verifica se produto é removido com sucesso", async () => {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await productModel.remove(1);
    expect(result).to.equal(1);
  });

  it("Verifica se produto é encontrado na pesquisa com sucesso", async () => {
    const output = productMock.searchMock;
    const prodSerch = "Martelo";
    sinon.stub(connection, "execute").resolves([output]);
    const result = await productModel.search(prodSerch);
    expect(result).to.deep.equal(output);
  });
});