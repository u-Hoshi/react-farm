import React, { useEffect } from 'react'
import axios from 'axios'
import { CsrfToken } from './types/types'
import { selectCsrfState } from './slices/appSlice'
import { useAppSelector } from './app/hooks'

function App() {
  const csrf = useAppSelector(selectCsrfState)
  const getCsrfToken = async () => {
    // axios.getの後にジェネリクス型<>で返り値の型を指定できる
    const res = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrftoken`
    )
    axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
  }
  useEffect(() => {
    getCsrfToken()
  }, [csrf])
  return <div></div>
}

export default App
