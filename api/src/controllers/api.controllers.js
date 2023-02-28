import { getDb } from '../DB.js';
import jwt from 'jsonwebtoken';
const DB = getDb();
const user = {
	status: '',
	message: '',
	response: {},
};

export const getuserData = (req, res) => {
	jwt.verify(req.token, 'secretKey', err => {
		if (err) {
			res.status(403).send({ status: 403 });
		} else {
			res.status(200).send(user);
		}
	});
};
export const modifyUserData = async (req, res) => {
	jwt.verify(req.token, 'secretKey', err => {
		if (err) {
			res.status(403).send({ status: 403 });
		} else {
			const DBUSERS = DB.data.users;
			const USERID = req.body.id;
			const USEREXIST = DBUSERS.find(el => el._id === USERID);
			console.log(USEREXIST);
			USEREXIST._id = req.body.id;
			USEREXIST.address = req.body.address;
			USEREXIST.age = req.body.age;
			USEREXIST.company = req.body.company;
			USEREXIST.email = req.body.email;
			USEREXIST.name = req.body.name;
			USEREXIST.phone = req.body.phone;
			DBUSERS.map(data => (data.id === USERID ? USEREXIST : data));
			res.status(200).send(USEREXIST);
		}
	});

	await DB.write();
};

export const loginUser = (req, res) => {
	const DBUSERS = DB.data.users;
	const USERNAME = req.body.name;
	const USERPASSWORD = req.body.password;
	if (USERNAME == '' || USERPASSWORD == '')
		return res.status(400).send({ msg: 'Fields empty' });

	const PASSWORDVERIFY = DBUSERS.find(el => el.password == USERPASSWORD);
	if (PASSWORDVERIFY == undefined)
		return res
			.status(403)
			.send({ ...user, status: 403, msg: 'Password or Username wrong' });
	const dbUser =
		PASSWORDVERIFY.name['first'] + ' ' + PASSWORDVERIFY.name['last'];

	if (USERNAME !== dbUser) {
		return res
			.status(403)
			.send({ ...user, status: 403, msg: 'Password or Username ' });
	} else {
		user.status = 200;
		user.response = {
			...user.response,
			image: PASSWORDVERIFY.picture,
			address: PASSWORDVERIFY.address,
			age: PASSWORDVERIFY.age,
			balance: PASSWORDVERIFY.balance,
			company: PASSWORDVERIFY.company,
			email: PASSWORDVERIFY.email,
			name: PASSWORDVERIFY.name,
			phone: PASSWORDVERIFY.phone,
			id: PASSWORDVERIFY._id,
		};

		jwt.sign({ user: user }, 'secretKey', (err, token) => {
			res.json({ token: token, status: 200 });
		});
	}
};
