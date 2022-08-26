import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Login() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd1)) return 'Please enter all forms.';
		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd1);
			navigate('/');
		} catch (err) {
			console.log(err);

			if (err.code === 'auth/user-not-found')
				setErr('This email does not exist.');
			else if (err.code === 'auto/wrong-password')
				setErr('This password does not match.');
			else setErr('fail to Lgoin');
		}
	};

	return (
		<Layout name={'Login'}>
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
			<BtnSet>
				<button onClick={handleLogin}>LOGIN</button>
				<button onClick={() => navigate('/join')}>JOIN</button>
			</BtnSet>
			{Err !== '' && <p>{Err}</p>}
		</Layout>
	);
}

export default Login;
