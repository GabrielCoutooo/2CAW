// Função para mudar o tema da página
const toggleThemeButton = document.getElementById('mudartema');
const body = document.body;
const header = document.querySelector('header');
const aside = document.querySelector('publicidade');
// Verificando em qual página o usuario está
if (window.location.href.indexOf('carrinho.html') > -1) {
  toggleThemeButton.addEventListener('click', () => {
    alert('Mudar Tema não está disponível no carrinho!');
  });
} else {
  toggleThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    aside.classList.toggle('dark-mode');
  });
}

// Botão Do formulário
const $enviarFormulario = $(".botaoanimado");
$enviarFormulario.on('click', function() {
  const mensagem = 'Formulário Enviado Com Sucesso!';
  alert(mensagem);
});

// Função para atualizar os valores de subtotal e total
function atualizarValores() {
  let novoSubtotal = 0;
  let fretevalor = parseFloat($('.calcularfrete').text().replace("R$ ", "").replace(",", ".") || "0");
  $('.produtos').each(function() {
    const qtdItens = parseInt($(this).find('.qtditens').text());
    const valorProduto = parseFloat($(this).find('.valorproduto').text().replace("R$ ", "").replace(",", "."));
    if (!isNaN(qtdItens) && !isNaN(valorProduto)) {
      const totalProduto = qtdItens * valorProduto;
      novoSubtotal += totalProduto;
      $(this).find('.total').text("R$ " + totalProduto.toFixed(2).replace(".", ","));
    }
  });
  const totalFinal = novoSubtotal + fretevalor;
  $('.subtotal').text("R$ " + novoSubtotal.toFixed(2).replace(".", ","));
  $('.total-final').text("R$ " + totalFinal.toFixed(2).replace(".", ","));
}

// Função para configurar os eventos dos botões de soma/diminuir/remover
function configurarEventosProduto(produto) {
  const botaosoma = produto.find('.mais');
  const botaosubtracao = produto.find('.menos');
  const qtdItens = produto.find('.qtditens');
  botaosoma.on('click', function() {
    const qtdAtual = parseInt(qtdItens.text());
    qtdItens.text(qtdAtual + 1);
    atualizarValores();
  });
  botaosubtracao.on('click', function() {
    const qtdAtual = parseInt(qtdItens.text());
    if (qtdAtual > 1) {
      qtdItens.text(qtdAtual - 1);
      atualizarValores();
    }
  });
  produto.find('.remover').on('click', function() {
    produto.remove();
    atualizarValores();
  });
}

$(document).ready(function() {
  // Configurar os botões existentes
  $('.produtos').each(function() {
    configurarEventosProduto($(this));
  });

  // Função gerador de frete
  const $calcularFrete = $("#calcularfrete");

  function gerarNumeroAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 51);
    return "R$ " + numeroAleatorio.toFixed(2).replace(".", ",");
  }

  // Evento de clique no botão para gerar e exibir o número aleatório
  $calcularFrete.on('click', function() {
    const numeroAleatorio = gerarNumeroAleatorio();
    $('.calcularfrete').text(numeroAleatorio);
    atualizarValores();
  });

  // Botão Finalizar Compra
  const $finalizarCompra = $("#finalizarcompra");
  $finalizarCompra.on('click', function() {
    const totalFinal = parseFloat($('.total-final').text().replace("R$ ", "").replace(",", "."));
    const mensagem = `Compra realizada com sucesso!\nObrigado por escolher nossa loja\nSeu pedido será entregue em breve!\nValor da Compra: R$ ${totalFinal.toFixed(2).replace(".", ",")}`;
    alert(mensagem);
  });

  // Array de produtos
  const produtos = [
    {
      imagem: 'imgs/camisasmasculinas/gemini.png',
      nome: 'Camisa Gemini Unreleased',
      categoria: 'Camisa Masculina',
      preco: 'R$ 120,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/camisa2.png',
      nome: 'Camisa HSWR',
      categoria: 'Camisa Masculina',
      preco: 'R$ 100,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/camisa3.png', 
      nome: 'Camisa Samurai',
      categoria: 'Camisa Masculina',
      preco: 'R$ 55,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/lizium.png', 
      nome: 'Camisa Lizium Masculina',
      categoria: 'Camisa Masculina',
      preco: 'R$ 65,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/camisa4.png', 
      nome: 'Camisa Pescador',
      categoria: 'Camisa Masculina',
      preco: 'R$ 65,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/camisa8.png', 
      nome: 'Camisa Cogumelo',
      categoria: 'Camisa Masculina',
      preco: 'R$ 100,00'
    },
    {
      imagem: 'imgs/camisasmasculinas/camisa9.png', 
      nome: 'Camisa High Company',
      categoria: 'Camisa Masculina',
      preco: 'R$ 80,00'
    },
    {
      imagem: 'imgs/calcasmasculinas/calcamasculina1.png', 
      nome: 'Calça Cinza',
      categoria: 'Calça Masculina',
      preco: 'R$ 200,00'
    },
    {
      imagem: 'imgs/calcasmasculinas/calcamasculina2.png', 
      nome: 'Calça Original Crew',
      categoria: 'Calça Masculina',
      preco: 'R$ 250,00'
    },
    {
      imagem: 'imgs/camisasfemininas/camisafeminina1.png', 
      nome: 'Blusa Gatinho',
      categoria: 'Blusa Feminina',
      preco: 'R$ 60,00'
    },
    {
    imagem: 'imgs/camisasfemininas/camisafeminina2.png', 
    nome: 'Blusa preta ',
    categoria: 'Blusa Feminina',
    preco: 'R$ 65,00'
    },
    {
      imagem: 'imgs/camisasfemininas/camisafeminina3.png', 
      nome: 'Blusa Cogumelo Feminina',
      categoria: 'Blusa Feminina',
      preco: 'R$ 65,00'
    }
  ];
  // Função para adicionar um produto ao carrinho
  function adicionarProdutoAoCarrinho() {
    // Seleciona um produto aleatório do array
    const produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)];
    // Cria uma linha para o produto no carrinho
    const linhaProduto = $(`
      <tr class="produtos">
        <td>
          <div class="produto">
            <img src="${produtoAleatorio.imagem}" alt="${produtoAleatorio.nome}" class="imagemcarrinho">
            <div class="info">
              <div class="name">${produtoAleatorio.nome}</div>
              <div class="categoria">${produtoAleatorio.categoria}</div>
            </div>
          </div>
        </td>
        <td class="valorproduto">${produtoAleatorio.preco}</td>
        <td>
          <div class="qtd">
            <button class="menos"><i class="fa-solid fa-minus"></i></button>
            <span class="qtditens">1</span>
            <button class="mais"><i class="fa-solid fa-plus"></i></button>
          </div>
        </td>
        <td class="total">R$ 0,00</td>
        <td>
          <button class="remover"><i class="fa-solid fa-xmark"></i></button>
        </td>
      </tr>
    `);
    // Adiciona a linha ao carrinho
    $('#maincarrinho table tbody').append(linhaProduto);
    // Configurar os botões do novo produto
    configurarEventosProduto(linhaProduto);
    // Atualizar os valores
    atualizarValores();
  }

  // Adicione um evento de clique ao botão "Adicionar Blusas"
  $('#adicionarblusas').on('click', function() {
    adicionarProdutoAoCarrinho();
  });
});

// Verificando se o JavaScript foi carregado
console.log("JavaScript Carregado!");
