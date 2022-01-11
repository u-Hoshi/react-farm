import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMutateAuth } from './useMutateAuth'

export const useProcessAuth = () => {
  const history = useHistory()
  const QueryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

  // submitボタンが押された時に呼び出される関数
  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      })
    } else {
      // 新規作成時は登録してからログインする必要がある
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw,
        })
        .then(() =>
          // 登録成功時
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
        .catch(() => {
          // 登録失敗時
          setPw('')
          setEmail('')
        })
    }
  }
  // ログアウト時
  const logout = async () => {
    await logoutMutation.mutateAsync() // 処理を同期化
    QueryClient.removeQueries('tasks')
    QueryClient.removeQueries('user')
    QueryClient.removeQueries('single')
    history.push('/')
  }

  return {
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
  }
}
