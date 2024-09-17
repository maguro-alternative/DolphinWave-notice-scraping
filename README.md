# DolphinWave-notice-scraping
ドルフィンウェーブのお知らせ取得スクリプト

# 使い方
## Google App Script
Googleアカウントにログインし、以下にアクセス。

https://script.google.com/home

新しいスクリプトを作成をクリックする。

![スクリプト作成](/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.29.20.png)

エディタ画面が開くので```main.gs```の内容を貼り付け。

![エディタ画面](/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.32.52.png)

以下からお知らせを受信したいものを選択。
<details>
<summary>Discord</summary>
  Discordのテキストチャンネルの設定画面へ。
  
  ![Webhook設定](/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.43.02.png)

  新しいウェブフックを作成でWebhookを作成。
  
  ![Webhook作成](/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.45.01.png)

  作成したWebhookのURLをコピーする。

  ![WebhookURLコピー](https://github.com/maguro-alternative/DolphinWave-notice-scraping/blob/main/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.45.26.png)
  
  DiscordWebhookURLにDiscordWebhookのURLを貼り付ける。
  ```js
  const DiscordWebhookURL = "https://discord.com/api/webhooks/xxxxxxxxxxxx";
  ```

</details>

<details>
<summary>Line Notify</summary>

  以下のサイトにアクセスする。(LINEログインもしておく)
  
  https://notify-bot.line.me/ja/
  
  Notifyのサービス登録も済ましておく。(Callbackは適当でOK)
  
  https://notify-bot.line.me/my/services/new

  サービスを登録したらトークンを発行する。

  ![トークン発行](/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-09-18%206.57.02.png)

  トークン名(なんでもいい)と送信先を選択。
  発行されたトークンを```LineNotifyToken```に貼り付け。
  ```js
  const LineNotifyToken = "xxxxxxxx";
  ```

  45~50行目のコードを以下のように変更する。
  ```js
  sendNotices.forEach((notice) => {
    console.log(notice);
    //sendDiscordWebhook(notice);
    sendLineNotify(notice);
    Utilities.sleep(1000);
  })
  ```

</details>

<details>
<summary>GMail</summary>

  ```MailAddress```に自身のメールアドレスを貼り付ける。
  ```js
  const MailAddress = "xxxxx@gmail.com";
  ```

  45~54行目を以下のように変更する。
  ```js
  /*sendNotices.forEach((notice) => {
    console.log(notice);
    sendDiscordWebhook(notice);
    //sendLineNotify(notice);
    Utilities.sleep(1000);
  })*/
  sendMailArray.forEach((mailArray) => {
    sendEmail(mailArray[0], mailArray[1]);
    Utilities.sleep(1000);
  })
  ```

</details>

