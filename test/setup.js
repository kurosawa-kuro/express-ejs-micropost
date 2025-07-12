import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// テスト用データベースファイルのパス
const testDbPath = path.join(__dirname, '..', 'data', 'test-db.json');

// テスト前セットアップ
beforeEach(() => {
  // テスト用データベースを初期化
  const testData = {
    microposts: [
      {
        id: "1",
        title: "Test Post 1"
      },
      {
        id: "2", 
        title: "Test Post 2"
      }
    ]
  };
  
  fs.writeFileSync(testDbPath, JSON.stringify(testData, null, 2));
});

// テスト後クリーンアップ
afterEach(() => {
  // テスト用データベースファイルを削除
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});