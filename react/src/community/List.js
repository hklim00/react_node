import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	margin-bottom: 50px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.01);
`;
function List() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios
			.post('/api/community/read')
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
					setList(res.data.communityList);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout name={'List'}>
			{List.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<br />
						<p>Writer : {post.writer.displayName}</p>
					</Item>
				);
			})}
		</Layout>
	);
}
export default List;
