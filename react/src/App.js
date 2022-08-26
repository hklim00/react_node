import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import firebase from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './redux/userSlice';

import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import List from './community/List';
import Detail from './community/Detail';
import Edit from './community/Edit';
import Login from './user/Login';
import Join from './user/Join';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log(userInfo);
			if (userInfo === null) dispatch(logoutUser());
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />
				<Route path='/login' element={<Login />} />
				<Route path='/join' element={<Join />} />
			</Routes>
		</>
	);
}

export default App;
