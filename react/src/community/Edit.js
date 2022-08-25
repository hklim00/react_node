import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnSet = styled.div`
	margin-top: 20px;
`;
function Edit() {
	const params = useParams();
	const navigate = useNavigate();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Con, setCon] = useState('');
	const [Loaded, setLoaded] = useState(false);

	const handleUpdate = () => {
		if (Title === '' || Con === '')
			return alert('please contain title & contents');

		const item = {
			title: Title,
			content: Con,
			num: params.num,
		};

		axios.post('/api/community/edit', item).then((res) => {
			if (res.data.success) {
				alert('success to edit text');
				navigate(`/detail/${item.num}`);
			} else {
				alert('fail to edit text');
			}
		});
	};

	useEffect(() => {
		const item = {
			num: params.num,
		};
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

	useEffect(() => {
		setTitle(Detail.title);
		setCon(Detail.content);
		setLoaded(true);
	}, [Detail]);

	return (
		<Layout name={'Edit'}>
			{Loaded ? (
				<>
					<label htmlFor='tit'>TITLE</label>
					<input
						type='text'
						id='tit'
						value={Title || ''}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<label htmlFor='con'>CONTENT</label>
					<textarea
						name='con'
						id='con'
						cols='30'
						rows='10'
						value={Con || ''}
						onChange={(e) => setCon(e.target.value)}></textarea>
					<BtnSet>
						<button onClick={() => navigate(-1)}>Cancle</button>
						<button onClick={handleUpdate}>Update</button>
					</BtnSet>
				</>
			) : (
				<p>loading...</p>
			)}
		</Layout>
	);
}

export default Edit;
