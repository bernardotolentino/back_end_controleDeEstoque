const { expect } = require("chai");
const sinon = require("sinon");

 const { saleModel } = require("../../../src/models");
 const { saleService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe("Testes de unidade para saleService", function () {
  afterEach( function () {
    sinon.restore();
  });

  it("Verifica se insere uma nova venda com sucesso", async function () {
    const output = saleMock.insertProdu.id
    sinon.stub(saleModel, 'insert').resolves(output)

    const result = await saleService.insert(saleMock.insertProdu)

    expect(result.type).to.equal(null)
    expect(result.message).to.equal(output)
  });
});