import React from 'react';
import logo from '/src/assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const navigate = useNavigate();
	const submitHandler = async e => {
		e.preventDefault();
		const containNumbers = /\d/;
		const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		const userName = form.username.value;
		const trimedUserName = userName.trim();
		const userNameLowercase = trimedUserName.replaceAll(' ', '').toLowerCase();
		const testingChar = specialChars.test(userNameLowercase);
		const testingNumbers = containNumbers.test(userNameLowercase);
		if (testingNumbers || testingChar)
			return window.alert(
				'the User Name doesnt MUST NOT to have numbers or symbols '
			);

		const credentials = {
			name: form.username.value,
			password: form.password.value,
		};

		fetch('http://127.0.0.1:5000/', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: { 'Content-type': 'application/json' },
		})
			.then(res => res.json())
			.then(res => {
				if (res.status == 200) {
					sessionStorage.setItem('token', res.token);
					navigate('/dashboard');
				} else {
					console.log(res);
					window.alert(res.msg);
				}
			});
	};

	return (
		<form className="login-form" id="form">
			<div className="form__logo">
				<img src={logo} alt="Smart Pump logo" />
			</div>
			<label htmlFor="username" className="form__label">
				USERNAME
			</label>
			<input
				type="text"
				id="username"
				className="form__input --user-input"
				name="username"
				placeholder="Insert username"
			/>
			<label htmlFor="password" className="form__label">
				PASSWORD
			</label>
			<input
				type="password"
				id="password"
				className="form__input --password-input"
				name="password"
				placeholder="Insert password"
			/>
			<input
				type="submit"
				name=""
				id=""
				onClick={submitHandler}
				className="form__input login-form__submit --login-input"
				value="Login"
			/>
		</form>
	);
};

export default Form;
