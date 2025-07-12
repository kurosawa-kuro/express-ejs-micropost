import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '../../data/db.json');

const adapter = new JSONFile(file);
const db = new Low(adapter, { microposts: [] });

export class MicropostModel {
  static async init() {
    await db.read();
    if (!db.data) {
      db.data = { microposts: [] };
      await db.write();
    }
  }

  static async getAll() {
    await db.read();
    return db.data.microposts.sort((a, b) => b.id - a.id);
  }

  static async getById(id) {
    await db.read();
    return db.data.microposts.find(post => post.id === parseInt(id));
  }

  static async create(title) {
    await db.read();
    const id = db.data.microposts.length > 0 
      ? Math.max(...db.data.microposts.map(p => p.id)) + 1 
      : 1;
    
    const newPost = {
      id,
      title: title.trim(),
      createdAt: new Date().toISOString()
    };
    
    db.data.microposts.push(newPost);
    await db.write();
    return newPost;
  }

}

// Initialize database
await MicropostModel.init();