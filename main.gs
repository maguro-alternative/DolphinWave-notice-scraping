const NoticeUrl = "https://webview-dolphin.marv-games.jp/news-top.html"
const DiscordWebhookURL = "";
const ScriptProperties = PropertiesService.getScriptProperties();

function main() {
  const postIdList = PostIdStrListGetProperties().split(',');
  let sendText = "";
  const sendNotices = [];
  const dolwave = UrlFetchApp.fetch(
    url = NoticeUrl,
    params = {
      "method": "get"
    }
  );
  const html = dolwave.toString();
  const idRegexp = /id="(\d+)"/g;
  const matches = [...html.matchAll(idRegexp)]
  const idList = [];
  for(const idMatch of matches.slice(0,9)) {
    const articeId = idMatch[1];
    idList.push(articeId);
    if (!postIdList.includes(articeId)) {
      const articeHtml = Parser.data(html).from(`<li id="${articeId}">`).to('</li>').build();
      const newsTitle = Parser.data(articeHtml).from(`<p class="news_title">`).to('</p>').build();
      const newsDate = Parser.data(articeHtml).from(`<div class="news_date">`).to('</div>').build();
      const slideBnr = Parser.data(html).from(`<div><a href="/news/articles/${articeId}.html">`).to('</a></div>').build();

      sendText = '<@&xxxxxx>' + newsDate + ' ' + newsTitle;
      if(!slideBnr.includes(`<meta charset="UTF-8">`)) {
        const imgRegexp = /\/news\/img\/(\w+)\.png/;
        const imgMatch = slideBnr.match(imgRegexp)
        sendText += `\nhttps://webview-dolphin.marv-games.jp${imgMatch[0]}`;
      }
      sendText += `\nhttps://webview-dolphin.marv-games.jp/news/articles/${articeId}.html`
      sendNotices.push(sendText);
    }
  }
  sendNotices.forEach((notice) => {
    console.log(notice);
    const payload = {
      content: notice,
    };
    UrlFetchApp.fetch(DiscordWebhookURL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
    });
    Utilities.sleep(1000);
  })
  PostIdStrListSetProperties(idList.join());
  //LastPostDateSetProperties(maxPostDateStr);
}

function LastPostDateSetProperties(date) {
  ScriptProperties.setProperty('lastPostDate', date);
}

function LastPostDateGetProperties() {
  return ScriptProperties.getProperty('lastPostDate')
}

function PostIdStrListSetProperties(idStrList) {
  ScriptProperties.setProperty('postIdStrList', idStrList);
}

function PostIdStrListGetProperties() {
  return ScriptProperties.getProperty('postIdStrList')
}

//0時にLINE側のプッシュ状況を知らせるためのトリガー設定
function setTrigger(){
  delTrigger();
  const time = new Date();
  time.setHours(14);
  time.setMinutes(01);
  ScriptApp.newTrigger('main').timeBased().at(time).create();
  time.setHours(17);
  time.setMinutes(01);
  ScriptApp.newTrigger('main').timeBased().at(time).create();
  time.setHours(18);
  time.setMinutes(01);
  ScriptApp.newTrigger('main').timeBased().at(time).create();
  time.setHours(0);
  time.setMinutes(01);
  ScriptApp.newTrigger('main').timeBased().at(time).create();
}
//トリガーの削除
function delTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "main"){
      ScriptApp.deleteTrigger(trigger);
    }
  } 
}
