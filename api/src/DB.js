import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
let db;
const __dirname = dirname(fileURLToPath(import.meta.url));
export async function Connection() {
	const DBFILE = join(__dirname, '../../data/users.json');
	const adapter = new JSONFile(DBFILE);
	db = new Low(adapter);
	await db.read();
	await db.write();
}

export function getDb() {
	return db;
}
Connection();
