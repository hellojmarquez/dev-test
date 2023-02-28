import APP from './app.js';
import { Connection } from './src/DB.js';

Connection();
APP.listen(5000, () => {
	console.log('running at port: ' + 5000);
});
