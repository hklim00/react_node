import React from 'react';
import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	return (
		<Layout name={'Join'}>
			<input
				type='eamil'
				value={Email}
				placeholder='Please enter email address'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd1}
				placeholder='Please enter password.'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd2}
				placeholder='Please re-enter password'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='text'
				value={Name}
				placeholder='Please enter your user name'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<BtnSet>
				<button>Cancel</button>
				<button>Join</button>
			</BtnSet>
		</Layout>
	);
}

export default Join;
