const fs = require("fs");
const config = require("config");

const propsRoot = config.app;

const initProps = () => {
  if (!config) {
    throw new Error("Failed to load default.yaml.");
  }

  /*
   *{api_key: String, api_token: String}
   */
  const trelloSecret = readJsonFile(propsRoot.trello.secretFileDirection);
  const slackSecret = readJsonFile(propsRoot.slack.secretFileDirection);

  const option = {
    trello: {
      apiKey: trelloSecret.api_key,
      apiToken: trelloSecret.api_token,

      boardId: trelloSecret.board_id,
      listDoneNamePrefix: propsRoot.trello.listDoneNamePrefix,
      listInReviewName: propsRoot.trello.listInReviewName,
      listExcludeAllCardsName: propsRoot.trello.listExcludeAllCardsName,
    },
    slack: {
      apiToken: slackSecret.api_token,
      channelId: slackSecret.channel_id,
    },
  };

  return option;
};

const readJsonFile = (fname) => {
  if (!fname) {
    throw new Error("Secret File is not defined.");
  }
  const jsonObject = JSON.parse(fs.readFileSync(fname, "utf8"));

  if (!jsonObject) {
    throw new Error("Failed to load secret setting.");
  }

  return jsonObject;
};

module.exports = {
  props: initProps(),
};
