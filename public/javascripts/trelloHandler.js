const error = function(errorMsg) {
  console.log(errorMsg);
};

const $1 = document.querySelector.bind(document);
const boardsDom = $1('#boards');

var boards = [];

const loadbtn = $1('#load-btn');
loadbtn.addEventListener('click', function(e) {
  getBoards();
  loadbtn.style.display='none';
})

function connectWebhook(id){
  $.post('/trello/webhook', {id: id})
  .done(function(data) {
    console.log(data);
  })
}

function getBoards() {
  $.get('/trello/boards')
  .done(function(data) {
    boards = data;
    for(var i = 0; i < boards.length; i++) {
      getCards(i, boards[i].id);
    }
  })
}

function getCards(index, bid) {
  $.get('/trello/board/' + bid + '/cards')
  .done(function(data) {
    boards[index].cards = data;
    for(var i = 0 ; i < data.length; i ++) {
      boards[index].cards[i].checklists = []
      for(var y = 0; y < data[i].idChecklists.length; y++) {
        getCheckList(index, i, data[i].idChecklists[y]);
      }
    }
  })
}

function getCheckList(boardIndex, cardIndex, cid) {
  $.get('/trello/checklist/' + cid)
  .done(function(data) {
    boards[boardIndex].cards[cardIndex].checklists.push(data);
  })
}

function loadBoards(){

  // Trello.get('/member/me/boards', function(boards) {
  //   boards.forEach(function(board) {
  //     let list1;
  //     connectWebhook(board.id);
  //     const boardDom = document.createElement('div');
  //     boardDom.className = 'board';
  //     const name = document.createElement('button');
  //     name.className = 'btn';
  //     name.innerText = board.name;
  //     const listsContainer = document.createElement('div');
  //     listsContainer.className = 'lists-container';
  //     boardsDom.appendChild(boardDom);
  //     boardDom.appendChild(name);
  //     boardDom.appendChild(listsContainer);
  //     Trello.get(`boards/${board.id}/lists`, function(lists) {
  //       lists.forEach(function(list){
  //         if(!list1)list1=list;
  //         const listDom = document.createElement('div');
  //         listDom.className = 'list';
  //         const name2 = document.createElement('button');
  //         name2.className = 'btn';
  //         name2.innerText = list.name;
  //         const cardsContainer = document.createElement('div');
  //         cardsContainer.className = 'cards-container';
  //         listsContainer.appendChild(listDom);
  //         listDom.appendChild(name2);
  //         listDom.appendChild(cardsContainer);
  //         Trello.get(`lists/${list.id}/cards`, function(cards) {
  //           cards.forEach(function(card){
  //             const cardDom = document.createElement('div');
  //             cardDom.className = 'card';
  //             const name3 = document.createElement('button');
  //             name3.className = 'btn';
  //             name3.innerText = card.name;
  //             cardsContainer.appendChild(cardDom);
  //             cardDom.appendChild(name3);
  //             name3.addEventListener('click',function() {
  //               // console.log(list1.id);
  //               Trello.put(`cards/${card.id}`, {
  //                 idList: list1.id
  //               }, error, error);
  //             });
  //           });
  //         }, error)
  //       })
  //     }, error)
  //   })
  // }, error)
}
