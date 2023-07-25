const { expect } = require("chai");
const sinon = require("sinon");
const connection = require ("../../../src/connection");

const { saleProductModel } = require("../../../src/models");
const { saleMock } = require("../mocks");

describe("Testes de unidade para saleProductModel", function () {
    afterEach(function () {
    sinon.restore();
  });
//   it("Verifica se venda é atualizada com sucesso", async function () {
//     sinon.stub(connection, "execute").resolves();
//     const result = await saleProductModel.update(saleMock.updateRight)
//     expect(result).to.equal();
//  });

  it("Verifica se é inserido uma nova venda com sucesso", async function () {
    const output = saleMock.insertProdu.id;
    sinon.stub(connection, "execute").resolves([{ insertId: output }]);
    const result = await saleProductModel.insert(
      saleMock.insertProdu
    );
    expect(result).to.deep.equal(output);
  });
 it("Verifica se é encontrado uma venda por id com sucesso", async function () {
    const output = saleMock.successFind;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await saleProductModel.findById(1);
    expect(result).to.deep.equal(output);
  });
   it("Verifica se é retornado todas as vendas com sucesso", async function () {
    const output = saleMock.getAllSalesM;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await saleProductModel.getAll();
    expect(result).to.deep.equal(output);
  });
  it("Verifica se venda é removida com sucesso", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await saleProductModel.remove(1);
    expect(result).to.equal(1);
 });

});