DROP SCHEMA IF EXISTS posse;
CREATE SCHEMA posse;
USE posse;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  userid INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS post;
CREATE TABLE IF NOT EXISTS post (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  userid INT NOT NULL,
  total_hour FLOAT NOT NULL,
  study_date DATE NOT NULL,
  study_lang VARCHAR(255) NOT NULL,
  study_content VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE post ADD CONSTRAINT FK_user_post FOREIGN KEY (userid) REFERENCES user;

INSERT INTO post set total_hour=3.0,  study_date='2022-09-14', userid=1, study_lang="HTML", study_content="ドットインストール";

DROP TABLE IF EXISTS languages;
CREATE TABLE IF NOT EXISTS languages (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  -- post_id INT NOT NULL,
  lang VARCHAR(255) NOT NULL,
  hour FLOAT NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL
);

-- INSERT INTO languages (post_id) SELECT id FROM post;
INSERT INTO languages SET lang='HTML', hour=1.0, created_at='2022-10-13',  updated_at='2022-10-13';
INSERT INTO languages SET lang='CSS', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='JavaScript', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='PHP', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='Laravel', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='SQL', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='SHELL', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO languages SET lang='情報システム基礎知識(その他)', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';

INSERT INTO languages SET lang='JavaScript', hour=1.0, created_at='2022-10-14', updated_at='2022-10-14';

SELECT sum(hour) FROM languages where curdate() = date(created_at);


-- ALTER TABLE languages ADD CONSTRAINT FK_post_langages FOREIGN KEY (post_id) REFERENCES post;

DROP TABLE IF EXISTS contents;
CREATE TABLE IF NOT EXISTS contents (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  -- post_id INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  hour FLOAT NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL
);

INSERT INTO contents SET content='ドットインストール', hour=3.0, created_at='2022-10-13', updated_at='2022-10-13';

INSERT INTO contents SET content='N予備校', hour=3.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO contents SET content='POSSE課題', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';
INSERT INTO contents SET content='POSSE課題', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';

INSERT INTO contents SET content='N予備校', hour=1.0, created_at='2022-10-13', updated_at='2022-10-13';

-- SELECT sum(hour) FROM contents where post_id=1;
select sum(hour) from contents where curdate() = date(created_at);

-- ALTER TABLE contents ADD CONSTRAINT FK_post_contents FOREIGN KEY (post_id) REFERENCES post;

-- select sum(hour) from languages where date BETWEEN date("Y-m-01") AND date("Y-m-t");
SELECT SUM(hour) FROM contents GROUP BY DATE_FORMAT(created_at,'%Y%m');
SELECT SUM(hour) FROM languages GROUP BY DATE_FORMAT(created_at,'%Y%m');

SELECT DATE_FORMAT(created_at, '%Y%m') as YM ,SUM(hour) FROM content GROUP BY DATE_FORMAT(created_at,'%Y%m');

-- SELECT sum(hour) FROM contents WHERE DATE_FORMAT(created_at, '%Y%m') = DATE_FORMAT(NOW(), '%Y%m');

--１ヶ月の合計
SELECT sum(hour) FROM contents where created_at between date_format(now(), '%Y-%m-01') and last_day(now());

--月の合計を日毎に
SELECT hour FROM contents where created_at >= date_format(now(),'%Y-%m-01');
SELECT hour FROM languages where created_at >= date_format(now(),'%Y-%m-01');

--月の合計を日毎に
  SELECT date_format(created_at,'%Y%m%d'),count(hour) FROM contents GROUP BY date_format(created_at,'%Y%m%d');
  
  --月の合計を日毎に
  SELECT date_format(created_at,'%Y%m%d'),count(hour) FROM languages GROUP BY date_format(created_at,'%Y%m%d');

--今月の日付を全て取得
SET @dt=NOW();
WITH n(num) AS (VALUES ROW(0), ROW(1), ROW(2), ROW(3), ROW(4), ROW(5), ROW(6), ROW(7), ROW(8), ROW(9))
    SELECT DATE_ADD(
                DATE_FORMAT(@dt, '%Y/%m/01')
            ,Interval n1.num*10+n2.num day) d
    FROM n n1, n n2
      WHERE n1.num*10+n2.num < DAYOFMONTH(LAST_DAY(@dt))
            ORDER BY d;

select date_format(created_at, '%Y-%m-%d') as created_at_f, sum(hour) as hour_day from contents group by created_at_f;

--日付ごとにcontentsの学習時間を取得（10月）
SELECT date_table.date AS 'created_at',IFNULL(sum(contents.hour), 0) as 'contents_perDate'
FROM (select '2022-10-01' + INTERVAL seq_no DAY AS date FROM (select @seq_no := 0 AS seq_no UNION SELECT @seq_no :=@seq_no + 1 AS seq_no FROM information_schema.COLUMNS LIMIT 31) tmp) date_table
LEFT JOIN contents on contents.created_at = date_table.date GROUP BY date_table.date;

--日付ごとにlanguagesの学習時間を取得（10月）
SELECT date_table.date AS 'created_at',IFNULL(sum(languages.hour), 0) as 'languages_perDate' 
FROM (select '2022-10-01' + INTERVAL seq_no DAY AS date FROM (select @seq_no := 0 AS seq_no UNION SELECT @seq_no :=@seq_no + 1 AS seq_no FROM information_schema.COLUMNS LIMIT 31) tmp) date_table
LEFT JOIN languages on languages.created_at = date_table.date GROUP BY date_table.date;

SELECT sum(hour), content FROM contents GROUP BY content;
SELECT sum(hour), lang FROM languages GROUP BY lang;