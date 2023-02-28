import React, { useState } from 'react';
import picture from '../assets/índice.jpg';
import { useNavigate } from 'react-router-dom';

const DashboardContent = ({ setuserData, userData, token }) => {
	const navigate = useNavigate();
	const [edit, setEdit] = useState(false);
	console.log(userData);

	const handleEdit = () => {
		// submitBtn.classList.toggle('--hidden');
		// editBtn.classList.toggle('--hidden');
		setEdit(true);
	};
	const handleSubmit = e => {
		e.preventDefault();
		let usernameVal = username.value;
		const first = usernameVal.substring(0, usernameVal.indexOf(' ')); // "72"
		const last = usernameVal.substring(usernameVal.indexOf(' ') + 1);
		console.log(first, last);
		const editedData = {
			id: userData.id,
			name: {
				first: first,
				last: last,
			},
			address: address.value,
			age: age.value,
			company: company.value,
			email: email.value,
			phone: phone.value,
		};
		fetch('http://127.0.0.1:5000/', {
			method: 'PUT',
			headers: {
				authorization: 'bearer ' + token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedData),
		})
			.then(res => res.json())
			.then(res => {
				if (!res.status == 200) {
					setEdit(false);
					return window.alert('error');
				} else {
					window.alert('data updated');
					setuserData(res);
					setEdit(false);
				}
			});
	};
	const handleLogOut = () => {
		sessionStorage.removeItem('token');
		navigate('/');
	};

	return (
		<>
			<div className="dashboard-wrapper">
				<header className="header">
					<nav className="nav">
						<button
							onClick={handleLogOut}
							className="form__input login-form__submit "
						>
							Log out
						</button>
					</nav>
				</header>
				<section>
					<main className="user">
						<div className="user__heading">
							<h1 className="user__name">
								{userData.name !== undefined &&
									userData.name['first'] + ' ' + userData.name['last']}{' '}
							</h1>
							<div className="user__img-container">
								<img
									src={userData.picture !== undefined && userData.picture}
									alt=""
								/>
							</div>
							<div className="user__balance">
								<h2>{userData.balance}</h2>
							</div>
						</div>
					</main>
					{edit === false ? (
						<div className="user-data">
							<ul>
								<li className="data-list__item --address-bg">
									{userData.address}
								</li>
								<li className="data-list__item --age-bg">{userData.age}</li>
								<li className="data-list__item --company-bg">
									{userData.company}
								</li>
								<li className="data-list__item --email-bg">{userData.email}</li>
								<li className="data-list__item --phone-bg">{userData.phone}</li>
							</ul>
						</div>
					) : (
						<form className="user-data" id="editForm">
							<label htmlFor="username" className="form__label">
								USERNAME
							</label>
							<input
								type="text"
								id="username"
								className="form__input"
								name="username"
								defaultValue={
									userData.name['first'] + ' ' + userData.name['last']
								}
							/>
							<label htmlFor="address" className="form__label">
								address
							</label>
							<input
								type="text"
								id="address"
								className="form__input"
								name="address"
								defaultValue={userData.address}
							/>

							<label htmlFor="age" className="form__label">
								Age
							</label>
							<input
								type="text"
								id="age"
								className="form__input"
								name="age"
								defaultValue={userData.age}
							/>
							<label htmlFor="company" className="form__label">
								Company
							</label>
							<input
								type="text"
								id="company"
								className="form__input"
								name="company"
								defaultValue={userData.company}
							/>
							<label htmlFor="email" className="form__label">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="form__input"
								name="email"
								defaultValue={userData.email}
							/>
							<label htmlFor="phonr" className="form__label">
								Phone
							</label>
							<input
								type="text"
								id="phone"
								className="form__input"
								name="phone"
								defaultValue={userData.phone}
							/>
						</form>
					)}
					{edit === false && (
						<button
							onClick={handleEdit}
							id="editBtn"
							className="form__input login-form__submit edit-btn"
						>
							Edit
						</button>
					)}
					{edit === true && (
						<button
							onClick={handleSubmit}
							id="submitBtn"
							className="form__input login-form__submit edit-btn "
						>
							Submit
						</button>
					)}
				</section>
			</div>
		</>
	);
};
export default DashboardContent;
