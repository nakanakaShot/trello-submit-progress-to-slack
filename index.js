const rp = require("request-promise");
const config = require("./config.js");
const dateFormatter = require("./dateFormat.js");

const props = config.props;
const trello = props.trello;
const slack = props.slack;

const today = new Date();

const calculateProgress = async () => {
  const lists = await getBoardsList();

  const cards = await getListsCard(lists);

  let total = 0;
  let done = 0;

  Object.entries(cards).forEach((arr) => {
    let list = { key: arr[0], val: arr[1] };

    if (list.key === trello.listDoneName) {
      done += list.val.length;
    }
    total += list.val.length;
  });

  const progressPercentNum = !total || !done ? 0 : (done / total) * 100;
  const progressPercentInt = parseInt(progressPercentNum);

  let message =
    "【" +
    dateFormatter.formatDate(today) +
    "】 " +
    "\n" +
    "現在までの作業進捗率：" +
    progressPercentInt +
    "%" +
    "\n" +
    "全タスク数　　：" +
    total +
    "\n" +
    "未完了のタスク：" +
    (total - done) +
    "\n" +
    "完了したタスク：" +
    done;

  await submitChatToSlack(message);
};

const getListsCard = async (lists) => {
  let cards = {};
  await Promise.all(
    lists.map(async (list) => (cards[list.name] = await getCards(list.id)))
  );
  return cards;
};

const getBoardsList = async () => {
  const url = "https://trello.com/1/boards/" + trello.boardId + "/lists";
  const qs = {
    key: trello.apiKey,
    token: trello.apiToken,
    fields: "name",
  };
  return await requestGet(url, qs);
};

const getCards = async (listId) => {
  const url = "https://trello.com/1/lists/" + listId + "/cards";
  const qs = {
    key: trello.apiKey,
    token: trello.apiToken,
    fields: "name",
  };
  return await requestGet(url, qs);
};

const submitChatToSlack = async (message) => {
  const url = "https://slack.com/api/chat.postMessage";
  const form = {
    token: slack.apiToken,
    channel: slack.channelId,
    text: message,
  };
  await requestPOST(url, form);
};

const requestGet = async (url, qs) => {
  if (!url) {
    throw new Error("url is required on GET request.");
  }

  const option = {
    url: url,
    method: "GET",
    qs: qs,
  };

  try {
    return JSON.parse(await rp(option));
  } catch (err) {
    switch (err.statusCode) {
      case 404:
        throw new Error("Requested page was not found. :\n" + err);
        break;
      default:
        throw new Error(
          "Error has occured on GET request. Detail :\n" +
            err +
            "\n Request : \n" +
            option.url +
            "\n" +
            option.method +
            "\n" +
            option.qs +
            "\n"
        );
        break;
    }
  }
};

const requestPOST = async (url, form) => {
  if (!url) {
    throw new Error("url is required on POST request.");
  }

  const option = {
    url: url,
    method: "POST",
    form: form,
  };

  try {
    return JSON.parse(await rp(option));
  } catch (err) {
    switch (err.statusCode) {
      case 404:
        throw new Error("Requested page was not found. :\n" + err);
        break;
      default:
        throw new Error(
          "Error has occured on POST request. Detail :\n" +
            err +
            "\n Request : \n" +
            option.url +
            "\n" +
            option.method +
            "\n" +
            option.qs +
            "\n"
        );
        break;
    }
  }
};

calculateProgress();
