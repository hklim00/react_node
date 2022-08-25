//firebase추가
import firebase from 'firebase/compat/app';
//firebase auth 추가
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDtXlot3_sB-eKaha6mFjfUbXiHXNZqqOY',
	authDomain: 'react-agust.firebaseapp.com',
	projectId: 'react-agust',
	storageBucket: 'react-agust.appspot.com',
	messagingSenderId: '521538141269',
	appId: '1:521538141269:web:31b445d9493e03badfe8dc',
	measurementId: 'G-ZCLXHNSFCX',
};

//firebase 초기화 구문으로 수정
firebase.initializeApp(firebaseConfig);

//firebase 내보내기
export default firebase;
