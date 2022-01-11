import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice'
import { User } from '../types/types'

// type Error = {}

export const useMutateAuth = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  //ログイン実行時に呼び出される関数
  const loginMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        history.push('/todo')
      },
      // anyを取り外す
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )
  const registerMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, user),
    {
      // anyを取り外す
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
        }
      },
    }
  )
  const logoutMutation = useMutation(
    async () =>
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {}, // ログアウト時にはデータを渡す必要はないので第二引数を空にする
        { withCredentials: true }
      ),
    {
      onSuccess: () => {
        history.push('/')
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          history.push('/')
        }
      },
    }
  )
  return { loginMutation, registerMutation, logoutMutation }
}
