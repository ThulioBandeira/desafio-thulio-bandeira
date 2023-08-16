class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    // Verificar se não há itens
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    const cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0 },
      { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.5 },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
      { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
      {
        codigo: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
      },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
      { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    ];

    // Mapear os itens para suas quantidades
    const itemQuantidades = {};
    for (let alimento of itens) {
      const [codigo, quantidade] = alimento.split(",");
      if (!itemQuantidades[codigo]) {
        itemQuantidades[codigo] = 0;
      }
      itemQuantidades[codigo] += parseInt(quantidade);
    }

    // Verificar se todos os itens são válidos e calcular o total
    for (let codigo in itemQuantidades) {
      const menuItem = cardapio.find((menuItem) => menuItem.codigo === codigo);

      if (!menuItem) {
        return "Item inválido!";
      }

      // Verificar se o item extra tem o respectivo item principal
      if (menuItem.descricao.includes("(extra")) {
        const itemPrincipalCodigo = menuItem.codigo.split("(")[0];
        if (!itemQuantidades[itemPrincipalCodigo]) {
          return "Item extra não pode ser pedido sem o principal";
        }

        // Verificar condições especiais para chantily e queijo
        if (menuItem.codigo === "chantily" && !itemQuantidades["cafe"]) {
          return "Item extra não pode ser pedido sem o principal";
        }
        if (menuItem.codigo === "queijo" && !itemQuantidades["sanduiche"]) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      total += menuItem.valor * itemQuantidades[codigo];
    }

    // Aplicar desconto ou acréscimo na forma de pagamento
    if (formaDePagamento === "dinheiro") {
      total *= 0.95;
    } else if (formaDePagamento === "credito") {
      total *= 1.03;
    } else if (formaDePagamento !== "debito") {
      return "Forma de pagamento inválida!";
    }

    total = total.toFixed(2);

    // Verificar se o total é válido
    if (total === "0.00") {
      return "Quantidade inválida!";
    }

    return `R$ ${total.replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
