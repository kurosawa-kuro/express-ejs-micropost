API テストコード対応依頼
APIテストコードのみでよし




## プロジェクト要件

### 設計思想
- **OpenAPI仕様書をシングルソース オブ トゥルースとして扱う**
- OpenAPI仕様書→テストコード→モデル→実装

### 基本情報
- **プロジェクト名**: express-ejs-micropost
- **プロジェクトパス**: `/home/wsl/dev/my-study/express-ejs-micropost`
- **言語**: Javascript PoCなのでType Scriptはオーバースペック
- **フレームワーク**: Node.js + Express + EJS

- **データベース**: db.json（JSON形式のファイルDB）PoCなのでPostgresqlはオーバースペック
- **必須ライブラリ**: openapi-backend（OpenAPIスキーマベースのバックエンド実装）


### データモデル
- **エンティティ**: micropost
- **フィールド**:
  - id: 一意識別子
  - title: 投稿タイトル

### 機能要件
- **実装する機能**:
  - 一覧表示（index）
  - 詳細表示（show）
  - 新規作成（create）
- **実装しない機能**:
  - 更新（update）
  - 削除（destroy）
  - ユーザー認証・ログイン
  - ファイル・画像アップロード

### API仕様
- **OpenAPI仕様書**: 必須（openapi.yaml）
- **APIバックエンド実装**: openapi-backendライブラリを必ず使用
- **Swagger UI**: 実装必須（APIテスト用インターフェース）
- **APIエンドポイント**:
  - GET /api/microposts - 一覧取得
  - GET /api/microposts/:id - 詳細取得
  - POST /api/microposts - 新規作成

### 実装要件
- **openapi-backend使用方法**:
  - OpenAPI仕様書からルーティングを自動生成
  - リクエスト/レスポンスのバリデーション自動化
  - エラーハンドリングの統一化
- **バリデーション**: Zodスキーマと連携
- **ミドルウェア構成**: openapi-backend → Express → EJS

### テスト要件
- OpenAPI仕様に基づいたAPIテストコードの実装
- openapi-backendのモックハンドラーを使用したテスト
- テスト用のjson.dbを別途用意

### デザイン要件
- 以下のテンプレートを参考にUIを実装:
  - `/home/wsl/dev/my-study/template-admin/mosaic-figma`
  - `/home/wsl/dev/my-study/template-admin/mosaic-html`

### 技術的制約
- **必須**: openapi-backendによるAPI実装
- エラーハンドリング: 適切なHTTPステータスコードとエラーメッセージ
- CORS対応: API利用のため設定必須

この仕様でmicropostサンプルアプリケーションを作成してください。