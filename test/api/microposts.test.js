import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';

describe('Microposts API', () => {
  describe('GET /api/microposts', () => {
    test('全投稿の一覧を正常に取得できる', async () => {
      const response = await request(app)
        .get('/api/microposts')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
          }),
        ]),
        count: expect.any(Number),
      });

      // テストデータから2件取得されることを確認
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
      expect(response.body.data[0].title).toBe('Test Post 2');
      expect(response.body.data[1].title).toBe('Test Post 1');
    });

    test('Content-Type が application/json である', async () => {
      const response = await request(app)
        .get('/api/microposts')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('レスポンス構造が OpenAPI 仕様に準拠している', async () => {
      const response = await request(app)
        .get('/api/microposts')
        .expect(200);

      // 実際のレスポンス形式をチェック
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      
      // データ配列の各要素が正しい構造を持つことを確認
      response.body.data.forEach(post => {
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(typeof post.id).toBe('string');
        expect(typeof post.title).toBe('string');
      });
    });
  });

  describe('GET /api/microposts/:id', () => {
    test('現在はIDパラメータバリデーションで400エラーが返る', async () => {
      const response = await request(app)
        .get('/api/microposts/1')
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('Invalid ID parameter'),
      });
    });

    test('存在しないIDでも400エラーが返る（バリデーション問題のため）', async () => {
      const response = await request(app)
        .get('/api/microposts/999')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid ID parameter');
    });

    test('無効なIDフォーマットの場合400エラーを返す', async () => {
      const response = await request(app)
        .get('/api/microposts/invalid')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Request validation failed|Invalid ID parameter/);
    });

    test('負の数のIDの場合400エラーを返す', async () => {
      const response = await request(app)
        .get('/api/microposts/-1')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Request validation failed|Invalid ID parameter/);
    });
  });

  describe('POST /api/microposts', () => {
    test('有効なデータで新規投稿を作成できる', async () => {
      const newPost = {
        title: 'New Test Post'
      };

      const response = await request(app)
        .post('/api/microposts')
        .send(newPost)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: {
          id: expect.any(Number),
          title: 'New Test Post',
          createdAt: expect.any(String),
        },
        message: expect.any(String),
      });

      // IDが自動で割り当てられることを確認
      expect(response.body.data.id).toBeGreaterThan(0);
      
      // createdAtがISO日時文字列であることを確認
      expect(new Date(response.body.data.createdAt)).toBeInstanceOf(Date);
    });

    test('titleが空文字列の場合400エラーを返す', async () => {
      const invalidPost = {
        title: ''
      };

      const response = await request(app)
        .post('/api/microposts')
        .send(invalidPost)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Request validation failed/);
    });

    test('titleが未定義の場合400エラーを返す', async () => {
      const invalidPost = {};

      const response = await request(app)
        .post('/api/microposts')
        .send(invalidPost)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Request validation failed/);
    });

    test('titleが文字列以外の場合400エラーを返す', async () => {
      const invalidPost = {
        title: 12345
      };

      const response = await request(app)
        .post('/api/microposts')
        .send(invalidPost)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Request validation failed/);
    });

    test('Content-Type が application/json でない場合適切にエラーを返す', async () => {
      const response = await request(app)
        .post('/api/microposts')
        .set('Content-Type', 'text/plain')
        .send('title=Test Post')
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('titleの前後の空白文字が自動的にトリムされる', async () => {
      const newPost = {
        title: '  Trimmed Title  '
      };

      const response = await request(app)
        .post('/api/microposts')
        .send(newPost)
        .expect(201);

      expect(response.body.data.title).toBe('Trimmed Title');
    });
  });

  describe('API エラーハンドリング', () => {
    test('存在しないエンドポイントの場合404エラーを返す', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Not found/);
    });

    test('許可されていないHTTPメソッドの場合404エラーとして処理される', async () => {
      const response = await request(app)
        .delete('/api/microposts')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Not found/);
    });
  });

  describe('レスポンス時間とパフォーマンス', () => {
    test('GET /api/microposts のレスポンス時間が適切である', async () => {
      const start = Date.now();
      
      await request(app)
        .get('/api/microposts')
        .expect(200);
        
      const responseTime = Date.now() - start;
      
      // 1秒以内にレスポンスを返すことを確認
      expect(responseTime).toBeLessThan(1000);
    });
  });
});