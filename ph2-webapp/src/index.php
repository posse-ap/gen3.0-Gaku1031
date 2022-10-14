<?php
require("dbconnect.php");

//今日のcontentsとlanguagesの学習時間を取得
$stmt = $db->query('SELECT sum(hour) FROM languages where curdate() = date(created_at)');
$stmt->execute();
$lang = $stmt->fetch(PDO::FETCH_COLUMN);

$stmt = $db->query('SELECT ifnull(sum(hour), 0) FROM contents where curdate() = date(created_at)');
$content = $stmt->fetch(PDO::FETCH_COLUMN);

//今日の学習時間の合計
$today_hour = compact("lang", "content");
$today_hours = array_sum($today_hour);

//contentsの日付ごとの学習時間
$stmt = $db->query("SELECT date_table.date AS 'created_at',IFNULL(sum(contents.hour), 0) as 'contents_perDate'
FROM (select '2022-10-01' + INTERVAL seq_no DAY AS date FROM (select @seq_no := 0 AS seq_no UNION SELECT @seq_no :=@seq_no + 1 AS seq_no FROM information_schema.COLUMNS LIMIT 31) tmp) date_table
LEFT JOIN contents on contents.created_at = date_table.date GROUP BY date_table.date;
");
$contents_date = $stmt->fetchAll();
$contents_perDate = array_column($contents_date, 'contents_perDate');

//languagesの日付ごとの学習時間
$stmt = $db->query("SELECT date_table.date AS 'created_at',IFNULL(sum(languages.hour), 0) as 'languages_perDate' 
FROM (select '2022-10-01' + INTERVAL seq_no DAY AS date FROM (select @seq_no := 0 AS seq_no UNION SELECT @seq_no :=@seq_no + 1 AS seq_no FROM information_schema.COLUMNS LIMIT 31) tmp) date_table
LEFT JOIN languages on languages.created_at = date_table.date GROUP BY date_table.date;");
$languages_date = $stmt->fetchAll();
$languages_perDate = array_column($languages_date, 'languages_perDate');

//日にちごとの学習時間の合計（配列）
$result = [];
foreach ($contents_perDate as $key => $val) {
  $result[] = $val + $languages_perDate[$key];
}

$json =  json_encode($result);
$filename1 = 'array.json';
file_put_contents($filename1, $json);

//今月のcontentsとlanguagesの学習時間を取得
$stmt = $db->query("SELECT sum(hour) FROM contents where created_at between date_format(now(), '%Y-%m-01') and last_day(now())");
$month_content = $stmt->fetch(PDO::FETCH_COLUMN);

$stmt = $db->query("SELECT sum(hour) FROM languages where created_at between date_format(now(), '%Y-%m-01') and last_day(now())");
$month_languages = $stmt->fetch(PDO::FETCH_COLUMN);

//今月の学習時間の合計
$month_hour = compact("month_content", "month_languages");
$month_hours = array_sum($month_hour);

//totalのcontentとlanguageの学習時間の合計
$stmt = $db->query("select sum(hour) from contents");
$total_content = $stmt->fetch(PDO::FETCH_COLUMN);

$stmt = $db->query("select sum(hour) from languages");
$total_language = $stmt->fetch(PDO::FETCH_COLUMN);

//totalの学習時間
$total_hour = compact("total_content", "total_language");
$total_hours = array_sum($total_hour);

//グラフ表示
//日毎に学習時間を取ってくる
// $stmt = $db->query("SELECT date_format(created_at,'%Y%m%d'),count(hour) FROM contents GROUP BY date_format(created_at,'%Y%m%d')");
$stmt = $db->query("SELECT count(hour) FROM contents GROUP BY date_format(created_at,'%Y%m%d')");
$hours_per_Contents = $stmt->fetchAll(PDO::FETCH_COLUMN);

$stmt = $db->query("SELECT count(hour) FROM languages GROUP BY date_format(created_at,'%Y%m%d')");
$hours_per_Languages = $stmt->fetchAll(PDO::FETCH_COLUMN);

$total_perDate = compact("hours_per_Contents", "hours_per_Languages");

//content別に学習時間の合計を取得
$stmt = $db->query("SELECT sum(hour) FROM contents GROUP BY content");
$perContents = $stmt->fetchAll(PDO::FETCH_COLUMN);
$json_contents = json_encode($perContents, JSON_NUMERIC_CHECK);
$filename2 = 'contents.json';
file_put_contents($filename2, $json_contents);

//lang別に学習時間の合計を取得
$stmt = $db->query("SELECT sum(hour) FROM languages GROUP BY lang");
$perLanguages = $stmt->fetchAll(PDO::FETCH_COLUMN);
$json_languages =  json_encode($perLanguages, JSON_NUMERIC_CHECK);
$filename3 = 'languages.json';
file_put_contents($filename3, $json_languages);


?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  <script src="./js/Chart.min.js" defer></script>
  <script src="https://unpkg.com/apexcharts/dist/apexcharts.min.js" defer></script>
  <script src="./js/chartjs-plugin-labels.js" defer></script>
  <script src="./js/myChart1.js" defer></script>
  <script src="./js/myChart2.js" defer></script>
  <script src="./js/myChart3.js" defer></script>
  <script src="./js/window.js" defer></script>
  <script src="./js/calender.js" defer></script>
  <script src="./js/load.js" defer></script>
  <title>ph1-original</title>
</head>
<body>
  <header class="p-header">
    <div class="p-header__logo">
      <img src="./img/logo.svg" alt="POSSE">
    </div>
    <nav class="p-header__nav">
        <label for="pop-up-1" class="p-header__nav__record">記録・投稿</label>
        <input type="checkbox" id="pop-up-1">
        <div class="overlay">
          <div class="window-1">
              <label for="pop-up-1" class="close">×</label>
              <div class="pop__left">
                  <p id="study-day">学習日<br>
                      <input type="button" id="day" name="day" onclick="showCalender();">
                  </p>
                  <div class="overlay" id="overlay">
                    <div class="window-3" id="window-3">
                      <input type="button" class="back" id="back" onclick="back();" /><label for="back" class="arrow">
                        <i class="fa fa-arrow-left"></i>
                      </label>
                      <table>
                          <thead>
                            <tr id="date">
                              <th id="prev">&lang;</th>
                              <th id="title" colspan="3">2020年10月</th>
                              <th id="next">&rang;</th>
                            </tr>
                            <tr id="day-of-week">
                              <th>Sun</th>
                              <th>Mon</th>
                              <th>Tue</th>
                              <th>Wed</th>
                              <th>Thu</th>
                              <th>Fri</th>
                              <th>Sat</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                        <label for="determine" class="determination" colspan="7">決定</label>
                          <input type="button" id="determine" onclick="determine();">
                    </div>
                  </div>
                  <h1>学習コンテンツ（複数選択可)</h1><br>
                  <div class="contents">
                    <label class="label">
                      <input type="checkbox" class="input__checkbox">
                      <span class="checkbox"></span>N予備校
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="contents" value="D"><span class="checkbox"></span>ドットインストール
                    </label>
                    <!-- 空のブロック要素を追加 -->
                    <div class="space-1"></div>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="contents" value="P"><span class="checkbox"></span>POSSE課題
                    </label>
                  </div>
                  <h1>学習言語(複数選択可)</h1><br>
                  <div class="languages">
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="html"><span class="checkbox"></span>HTML
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="css"><span class="checkbox"></span>CSS
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="javaScript"><span class="checkbox"></span>JavaScript
                    </label>
                    <div class="space-1"></div>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="php"><span class="checkbox"></span>PHP
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="laravel"><span class="checkbox"></span>Laravel
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="sql"><span class="checkbox"></span>SQL
                    </label>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="shell"><span class="checkbox"></span>SHELL
                    </label>
                    <div class="space-1"></div>
                    <label class="label">
                      <input type="checkbox" class="input__checkbox" name="languages" value="others"><span class="checkbox"></span>情報システム基礎知識(その他)
                    </label>
                  </div>
              </div>
              <div class="pop__right">
                <p id="study-time">学習時間<br>
                <input type="text" id="hour" name="hour"></p>
                <p id="twitter-comment">Twitter用コメント<br>
                <textarea name="twitter" id="twitter" cols="30" rows="10"></textarea></p>
                <label class="label__twitter">
                  <input type="checkbox" class="t__checkbox" name="share" value="twitter"><span class="twitter__checkbox"></span>Twitterにシェアする
                </label>
              </div>
              <label for="pop-up-2" class="window__footer">記録・投稿</label>
              <input type="checkbox" id="pop-up-2" onclick="showLoad();">
              <div class="overlay">
                <div class="window-2">
                  <label for="pop-up-2" class="close">×</label>
                  <div class="loader-wrap" id="loading">
                    <div class="loader" id="loader"></div>
                  </div>
                  <div class="completion">
                    <span class="awesome">AWESOME!</span>
                    <div class="checkmark"></div>
                    <span class="completion__text">記録・投稿<br>完了しました</span>
                  </div>

                </div>
              </div>
          </div>
        </div>
    </nav>
</header>

<main class="p-main">
  <div class="p-body-chart">
    <div class="p-body-left">
      <div class="p-body-hour-flex">
        <div class="p-body-hour">
          <p class="hour-title">Today</p>
          <span class="hour-number"><?php echo $today_hours ?></span>
          <span class="hour-text">hour</span>
        </div>
        <div class="p-body-hour">
          <p class="hour-title">Month</p>
          <span class="hour-number"><?php echo $month_hours ?></span>
          <span class="hour-text">hour</span>
        </div>
        <div class="p-body-hour">
          <p class="hour-title">Total</p>
          <span class="hour-number"><?php echo $total_hours ?></span>
          <span class="hour-text">hour</span>
        </div>
      </div>
      <hr class="boundary">
      <div class="myChart1" id="myChart1" style="min-height: initial">
      <!-- <script>
        let result_perDate =;
      </script> -->
      <script src="./js/myChart1.js"></script>
      </div>
    </div>
    <div class="p-body-right">
      <div class="circle-left">
        <div  id="myChart2" class="myChart2">
        <script src="./js/myChart2.js"></script>
        </div>
      </div>
      <div class="circle-right">
        <div id="myChart3" class="myChart3">
        <script src="./js/myChart3.js"></script>
        </div>
      </div>
    </div>
  </div>
  <div class="date">
    <input type="submit" class="back" name="calender[2020-09]" value="&lang;">
    2020年 10月
    <input type="submit" class="next" name="calender[2020-11]" value="&rang;">
  </div>
  <label for="pop-up-1" class="p-footer__nav__record">記録・投稿</label>
  <input type="checkbox" id="pop-up-1">
</main>
</body>
</html>