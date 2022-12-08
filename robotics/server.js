const express = require("express");
const path = require("path");
const app = express();

const MongoClient = require("mongodb").MongoClient;

// ObjectId type casting을 위한 import
const ObjectId = require("mongodb").ObjectId;

// .env
require("dotenv").config();

// express에 내장된 body-parser 사용
app.use(express.urlencoded({ extended: true }));

// react와 nodejs 서버간 ajax 요청 잘 되게`
app.use(express.json());
var cors = require("cors");
const { send } = require("process");
app.use(cors());

//db라는 변수에 데이터베이스 연결, env파일 참조
var db;
MongoClient.connect(process.env.DB_URL, function (err, client) {
  if (err) {
    return console.log(err);
  }
  // db라는 변수에 zwon 데이터베이스를 연결.
  db = client.db("waterbottle");

  app.listen(process.env.PORT, function () {
    console.log(`listening on ${process.env.PORT}`);
  });
});

// 특정폴더 안의 파일들을 static파일로 client들에게 보내줄 수 있음
app.use(express.static(path.join(__dirname, "./dashboard/build")));

// 홈페이지(/) 접속시, build된 react의 html 전송
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./dashboard/build/index.html"));
});

app.get('/api/realtimedata', function (req, res) {
    db.collection('RealTimeData').find().toArray(
        function (err, result) {
            if (err){
                return console.log('/api/realtimedata - find Error :', err);
            }
            console.log('/api/realtimedata - find result length :', result.length);
            return res.json(result);
        }
    )
})

app.use("*", express.static(path.join(__dirname, "./dashboard/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dashboard/build/index.html"));
});