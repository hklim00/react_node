import React from 'react';

function Layout({ children, name }) {
	return (
		<div className='content'>
			<div className='inner'>
				<h1>{name}</h1>
				<section>{children}</section>
			</div>
		</div>
	);
}

export default Layout;
