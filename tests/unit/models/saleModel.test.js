const { expect } = require("chai");
const sinon = require("sinon");
const connection = require ("../../../src/connection");

const { saleModel } = require("../../../src/models");
const { saleMock } = require("../mocks");

describe("Testes de unidade para saleModel", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Verifica se é inserida nova venda com sucesso", async function () {
    const output = saleMock.insertProdu.id
    sinon.stub(connection, 'execute').resolves([{ insertId: output }])
    const result = await saleModel.insert(saleMock.insertProdu)
    expect(result).to.deep.equal(output)
  });
});