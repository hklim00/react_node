const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//express에서 react폴더안쪽의 build폴더를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

//클라이언트에서 보내는 데이터를 받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 커뮤니티 전용 라우터
app.use('/api/community', require('./router/communityRouter.js'));
// user 전용라우터
app.use('/api/user', require('./router/userRouter.js'))

app.listen(port, () => {
	mongoose
		.connect(
			'mongodb+srv://lhk0082:pass_wd1245@cluster0.1f6oapx.mongodb.net/?retryWrites=true&w=majority'
		)
		//접속 성공시
		.then(() => {
			console.log(`Server app listening on port ${port}`);
			console.log('Connecting MongoDB...');
		})
		//접속 실패시
		.catch((err) => {
			console.log(err);
		});
});

app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

//어떤 URL에서 새로고침하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
