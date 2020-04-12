# trello-submit-progress-to-slack

# 事前準備
ルートディレクトリに default.yml に記載のシークレットファイル.json を作成する

## trelloの設定
### ボードの準備
1. 進捗管理用ボードを作成する
1. 右記の通りにリストを作成する [バックログ, TODO, 進行中, IN REVIEW, DONE]

### 設定ファイルの準備
1. trello用シークレットファイルを作成 (デフォルト設定： ~/.secret/.trello.json)
1. 下記内容の json を記述
`<この中は適宜変更すること>`
```
{
  "api_key":"<trello にアクセスするためのAPIキー>"
  "api_token":"<trello にアクセスするためのAPIトークン>"
  "board_id": "<進捗管理を行うボードのID>"
}
```

## slack
### チャンネルの準備
1. 進捗管理用チャンネルを作成する

### 設定ファイルの準備
1. slack用シークレットファイルを作成 (デフォルト設定： ~/.secret/.slack.json)
1. 下記内容の json を記述
`<この中は適宜変更すること>`
```
{
  "api_token":"<slack app にアクセスするためのAPIトークン>"
  "channel_id": "<進捗管理を行うチャンネルのID>"
}
```
