import React, { useEffect, useState } from 'react';
import DashboardContent from './DashboardContent';

const UserDashboard = () => {
	const TOKEN = sessionStorage.getItem('token');

	const [userData, setuserData] = useState([]);

	useEffect(() => {
		fetch('http://127.0.0.1:5000/user', {
			method: 'POST',
			headers: { authorization: 'bearer ' + TOKEN },
		})
			.then(res => res.json())
			.then(res => setuserData(res.response));
	}, [TOKEN]);

	return (
		// <></>
		userData !== undefined && (
			<DashboardContent
				setuserData={setuserData}
				userData={userData}
				token={TOKEN}
			/>
		)
	);
};

export default UserDashboard;
