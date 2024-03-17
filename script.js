class Card {
  constructor(column, title) {
    this.column = column; // Armazena a coluna em que o cartão está
    this.title = title; // Armazena o título do cartão
    this.cardElement = this.createCardElement(); // Cria o elemento do cartão
  }

  createCardElement() {
    const cardElement = document.createElement("div"); // Cria um elemento <div>
    cardElement.classList.add("card"); // Adiciona a classe "card" ao elemento
    cardElement.textContent = this.title; // Define o texto do cartão como o título fornecido
    cardElement.id = 'card-' + Date.now(); // Gera um ID único para o cartão
    return cardElement; // Retorna o elemento do cartão criado
  }
}

// Função para criar e adicionar um novo cartão à coluna 'to-do'
function addCard(title) {
  const column = document.querySelector(".column.to-do"); // Seleciona a coluna 'to-do'
  const card = new Card(column, title); // Cria um novo objeto de cartão
  column.appendChild(card.cardElement); // Adiciona o elemento do cartão à coluna
}

const addCardButton = document.querySelector(".btn"); // Seleciona o botão de adicionar cartão
addCardButton.addEventListener("click", () => { // Adiciona um ouvinte de eventos para o clique no botão
  const title = prompt("Digite o título do cartão:"); // Pede ao usuário que insira o título do cartão
  if (title) { // Se o título for fornecido
    addCard(title); // Chama a função para adicionar o cartão
  }
});

// Adiciona a funcionalidade de ordenação às colunas
const columns = document.querySelectorAll('.sortable'); // Seleciona todas as colunas com a classe "sortable"
columns.forEach(column => { // Itera sobre cada coluna selecionada
  new Sortable(column, { // Inicializa a biblioteca Sortable para a coluna atual
    group: 'kanban', // Identificador do grupo para arrastar e soltar
    animation: 150, // Duração da animação de transição (em milissegundos)
    onEnd: function (event) { // Função chamada quando a ordenação é concluída
      const cardId = event.item.id; // Obtém o ID do item (cartão) movido
      const card = document.getElementById(cardId); // Seleciona o elemento do cartão movido
      const targetColumn = event.to; // Obtém a coluna de destino
      targetColumn.appendChild(card); // Adiciona o cartão à coluna de destino
    }
  });
});
