export interface Task {
  id: string
  title: string
  description: string
}

// /api/userから取得できるUserInfの型
export interface UserInfo {
  email: string
}

// ログイン時にフロントエンドからRESTAPIに渡すemailとpwの型
export interface User {
  email: string
  password: string
}

export interface CsrfToken {
  csrf_token: string
}
