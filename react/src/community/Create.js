import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';

function Create() {
	const navigate = useNavigate();
	const [Title, setTitle] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		if (Title.trim() === '' || Con.trim() === '')
			return alert('please contain title & contents');
		const item = { title: Title, content: Con };

		axios
			.post('/api/community/create', item)
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					alert('success to save');
					navigate('/list');
				} else {
					alert('fail to save');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>TITLE</label>
			<br />
			<input
				type='text'
				id='tit'
				value={Title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<br />

			<label htmlFor='con'>CONTENT</label>
			<br />
			<textarea
				name='con'
				id='con'
				cols='30'
				rows='10'
				value={Con}
				onChange={(e) => setCon(e.target.value)}></textarea>
			<br />
			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;
