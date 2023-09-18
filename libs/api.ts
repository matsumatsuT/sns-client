/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/auth/register/": {
    /** Register a new user */
    post: operations["registerUser"];
  };
  "/api/auth/login/": {
    /** Login */
    post: operations["loginUser"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * @example {
     *   "name": "test",
     *   "email": null
     * }
     */
    User: {
      /** @description ユーザー名 */
      name?: string;
      /** @description メールアドレス */
      email: string;
      /** @description パスワード */
      password: string;
    };
    Post: {
      /** @description 投稿内容 */
      content: string;
      /** @description 投稿日時 */
      createdAt: string;
      /** @description 投稿者ID */
      authorId: string;
      /** @description ユーザ情報 */
      author: components["schemas"]["User"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Register a new user */
  registerUser: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** Login */
  loginUser: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
}
