import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../common/Layout';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Detail() {
	const navigate = useNavigate();
	const params = useParams();
	const user = useSelector((store) => store.user);

	const [Detail, setDetail] = useState(null);

	const item = {
		num: params.num,
	};

	const handleDelete = () => {
		if (!window.confirm('confirm deldete')) return;
		axios
			.post('/api/community/delete', item)
			.then((res) => {
				if (res.data.success) {
					alert('success to delete');
					navigate(`/list`);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.post('/api/community/detail', item)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.detail);
					setDetail(res.data.detail);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout name={'Detail'}>
			{Detail && (
				<>
					<DetailWrap>
						<h2>{Detail.title}</h2>
						<p>{Detail.content}</p>
						<br />
						<p>Write : {Detail.writer.displayName}</p>
					</DetailWrap>
					{user.uid === Detail.writer.uid && (
						<BtnSet>
							<button>
								<Link to={`/edit/${Detail.communityNum}`}>Edit</Link>
							</button>
							<button onClick={handleDelete}>Delete</button>
						</BtnSet>
					)}
				</>
			)}
		</Layout>
	);
}

export default Detail;
