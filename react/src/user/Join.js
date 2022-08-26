import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../firebase';
import axios from 'axios';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2))
			return alert('Please enter all forms.');
		if (Pwd1 !== Pwd2) return alert('Please enter the same password.');
		if (Pwd1.length < 6) return alert('Please enter latest 6 word');

		let createUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(Email, Pwd1);
		await createUser.user.updateProfile({
			displayName: Name,
		});

		const item = {
			email: createUser.user.multiFactor.user.email,
			displayName: createUser.user.multiFactor.user.displayName,
			uid: createUser.user.multiFactor.user.uid,
		};

		firebase.auth().signOut();

		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				alert('success to join');
				navigate('/login');
			} else {
				return alert('fail to join');
			}
		});
	};

	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={Email}
				placeholder='Please enter email address'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd1}
				placeholder='Please enter password.'
				onChange={(e) => setPwd1(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd2}
				placeholder='Please re-enter password'
				onChange={(e) => setPwd2(e.target.value)}
			/>
			<input
				type='text'
				value={Name}
				placeholder='Please enter your user name'
				onChange={(e) => setName(e.target.value)}
			/>
			<BtnSet>
				<button onClick={() => navigate('/')}>Cancel</button>
				<button onClick={handleJoin}>Join</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;
