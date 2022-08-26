import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import styled from 'styled-components';

const HeaderWrap = styled.header`
	width: 350px;
	height: 100vh;
	background: #222;
	position: fixed;
	top: 0;
	left: 0;
	padding: 50px;
`;

const Logo = styled.h1`
	margin-bottom: 40px;
	a {
		font: 50px/1 'arial';
		color: #fff;
	}
`;
const Gnb = styled.ul`
	a {
		display: block;
		padding: 10px;
		font: bold 16px/1 'arial';
		color: #bbb;
		&:hover {
			color: hotpink;
		}
	}
`;

const Util = styled.ul`
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	li {
		margin-right: 20px;
		a {
			font: 14px/1 'arial';
			color: #555;
		}
	}
`;

const Util2 = styled.div`
	position: absolute;
	bottom: 50px;
	left: 50px;
	p {
		color: #777;
	}
	span {
		color: red;
		cursor: pointer;
	}
`;

function Header() {
	const activeStyle = { color: 'hotpink' };
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	console.log(user);

	return (
		<HeaderWrap>
			<Logo>
				<NavLink to='/'>LOGO</NavLink>
			</Logo>
			<Gnb id='gnb'>
				<li>
					<NavLink to='/list'>Show List</NavLink>
				</li>
				{user.accessToken !== '' && (
					<li>
						<NavLink to='/create'>Write Post</NavLink>
					</li>
				)}
			</Gnb>
			{user.accessToken === '' ? (
				<Util>
					<li>
						<NavLink
							to='/login'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							Login
						</NavLink>
					</li>

					<li>
						<NavLink
							to='/join'
							style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							Join
						</NavLink>
					</li>
				</Util>
			) : (
				<Util2>
					<span
						onClick={() => {
							firebase.auth().signOut();
							alert('Sueccess to Logout, Move to Main');
							navigate('/');
						}}>
						Logout
					</span>
					<br />
					<p>{`Welcome ${user.displayName}`}</p>
				</Util2>
			)}
		</HeaderWrap>
	);
}

export default Header;
