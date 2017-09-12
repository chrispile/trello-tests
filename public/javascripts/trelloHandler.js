const error = function(errorMsg) {
  console.log(errorMsg);
};

var authenticationSuccess = function(res) {
   console.log('Successful authentication');
   loadBoards();
 };
var authenticationFailure = function() {
  console.log('Failed authentication');
};

const $1 = document.querySelector.bind(document);
const boardsDom = $1('#boards');

const authbtn = $1('#authenticate-btn');
authbtn.addEventListener('click', function(e) {
  Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
      read: 'true',
      write: 'true' },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });
  authbtn.style.display='none';
})

function connectWebhook(id){
  $.post(`https://api.trello.com/1/tokens/${Trello.token()}/webhooks/?key=6744fbc46bafd8abfa31d3edf4ecf59c`, {
    description: "My first webhook",
    callbackURL: "http://4ea8644b.ngrok.io/trelloCallback",
    idModel: id
  })
}

function loadBoards(){
  Trello.get('/member/me/boards', function(boards) {
    boards.forEach(function(board) {
      let list1;
      // connectWebhook(board.id);
      const boardDom = document.createElement('div');
      boardDom.className = 'board';
      const name = document.createElement('button');
      name.className = 'btn';
      name.innerText = board.name;
      const listsContainer = document.createElement('div');
      listsContainer.className = 'lists-container';
      boardsDom.appendChild(boardDom);
      boardDom.appendChild(name);
      boardDom.appendChild(listsContainer);
      Trello.get(`boards/${board.id}/lists`, function(lists) {
        lists.forEach(function(list){
          if(!list1)list1=list;
          const listDom = document.createElement('div');
          listDom.className = 'list';
          const name2 = document.createElement('button');
          name2.className = 'btn';
          name2.innerText = list.name;
          const cardsContainer = document.createElement('div');
          cardsContainer.className = 'cards-container';
          listsContainer.appendChild(listDom);
          listDom.appendChild(name2);
          listDom.appendChild(cardsContainer);
          Trello.get(`lists/${list.id}/cards`, function(cards) {
            cards.forEach(function(card){
              const cardDom = document.createElement('div');
              cardDom.className = 'card';
              const name3 = document.createElement('button');
              name3.className = 'btn';
              name3.innerText = card.name;
              cardsContainer.appendChild(cardDom);
              cardDom.appendChild(name3);
              name3.addEventListener('click',function() {
                // console.log(list1.id);
                Trello.put(`cards/${card.id}`, {
                  idList: list1.id
                }, error, error);
              });
            });
          }, error)
        })
      }, error)
    })
  }, error)
}
