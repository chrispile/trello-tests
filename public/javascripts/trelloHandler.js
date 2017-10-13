const error = function(errorMsg) {
  console.log(errorMsg);
};

const $1 = document.querySelector.bind(document);
const boardsDom = $1('#boards');

var boards = [];

const loadbtn = $1('#load-btn');
loadbtn.addEventListener('click', function(e) {
  // getBoards();
  const idModel = "59e12d8df749d620da2ead40" //CHANGE THIS TO THE BOARD ID
  connectWebhook(idModel);
  loadbtn.style.display='none';
})

function connectWebhook(id){
  $.post('/trello/webhook', {id: id})
  .done(function(data) {
    console.log(data);
    console.log('Connected Webhook!');
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
