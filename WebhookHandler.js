module.exports = function (res) {
  switch (res.type) {
    case 'createCard':
      return formatAddCard(res);
    case 'deleteCard':
      return formatDeleteCard(res);
    case 'addChecklistToCard':
      return formatAddChecklistToCard(res);
    case 'addMemberToCard':
      return formatAddMemberToCard(res);
    case 'createCheckItem':
      return formatCreateCheckItem(res);
    case 'deleteCheckItem':
      return formatDeleteCheckItem(res);
    case 'removeChecklistFromCard':
      return formatRemoveChecklistFromCard(res);
    case 'removeMemberFromCard':
      return formatRemoveMemberFromCard(res);
    case 'updateCard':
      return formatUpdateCard(res);
    case 'updateBoard':
      return formatUpdateBoard(res);
    case 'updatecheckItem':
      return formatUpdateCheckItem(res);
    case 'updateCheckItemStateOnCard':
      return formatUpdateCheckItem(res);
    case 'updateChecklist':
      return formatUpdateChecklist(res);
    case 'addAttachmentToCard':
      return formatAddAttachmentToCard(res);
    default:
      break;
  }
};

const formatAddCard = function (res) {
  return {
    data: {
      name: res.data.card.name,
      idSource: res.data.card.id,
      idProject: res.data.board.id
    },
    action: 'add',
    item: 'task'
  };
};

const formatDeleteCard = function (res) {
  return {
    data: {
      idSource: res.data.card.id
    },
    action: 'delete',
    item: 'task'
  };
};

const formatAddChecklistToCard = function (res) {
  return {
    data: {
      name: res.data.checklist.name,
      idSource: res.data.checklist.id,
      idTask: res.data.card.id,
      idProject: res.data.board.id
    },
    action: 'add',
    item: 'checklist'
  };
};

const formatAddMemberToCard = function (res) {
  return {
    data: {
      name: res.member.fullName,
      idSource: res.member.id,
      idTask: res.data.card.id,
      idProject: res.data.board.id
    },
    action: 'add',
    item: 'assignee'
  };
};

const formatCreateCheckItem = function (res) {
  return {
    data: {
      name: res.data.checkItem.name,
      complete: false,
      idSource: res.data.checkItem.id,
      idProject: res.data.board.id,
      idTask: res.data.card.id,
      idChecklist: res.data.checklist.id
    },
    action: 'add',
    item: 'subtask'
  };
};

const formatDeleteCheckItem = function (res) {
  return {
    data: {
      idSource: res.data.checkItem.id
    },
    action: 'delete',
    item: 'subtask'
  };
};

const formatRemoveChecklistFromCard = function (res) {
  return {
    data: {
      idsource: res.data.checklist.id
    },
    action: 'delete',
    item: 'checklist'
  };
};

const formatRemoveMemberFromCard = function (res) {
  return {
    data: {
      idSource: res.data.idMember,
      idTask: res.data.card.id
    },
    action: 'delete',
    item: 'assignee'
  };
};

const formatUpdateCard = function (res) {
  const updatedField = Object.keys(res.data.old)[0];
  const toReturn = {
    data: {
      idSource: res.data.card.id,
      idProject: res.data.board.id
    },
    action: 'update',
    item: 'task'
  };
  toReturn.data[updatedField] = res.data.card[updatedField];
  return toReturn;
};

const formatUpdateBoard = function (res) {
  const updatedField = Object.keys(res.data.old)[0];
  const toReturn = {
    data: {
      idSource: res.data.board.id
    },
    action: 'update',
    item: 'project'
  };
  toReturn.data[updatedField] = res.data.card[updatedField];
  return toReturn;
};

const formatUpdateCheckItem = function (res) {
  return {
    data: {
      name: res.data.checkItem.name,
      idSource: res.data.checkItem.id,
      complete: res.data.checkItem.state === 'complete',
      idTask: res.data.card.id
    },
    action: 'update',
    item: 'subtask'
  };
};

const formatUpdateChecklist = function (res) {
  return {
    data: {
      name: res.data.checklist.name,
      idSource: res.data.checklist.id
    },
    action: 'update',
    item: 'checklist'
  };
};

const formatAddAttachmentToCard = function (res) {
  return {
    data: {
      url: res.data.attachment.url,
      name: res.data.attachment.name,
      idSource: res.data.attachment.id,
      idTask: res.data.card.id,
      idProject: res.data.board.id
    },
    action: 'add',
    item: 'document'
  };
};
