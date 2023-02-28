export const verifiedUser = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const TOKEN = bearerHeader.split(' ')[1];
		req.token = TOKEN;
		next();
	} else {
		console.log('fallo');
		res.status(403).send({});
	}
	next();
};
