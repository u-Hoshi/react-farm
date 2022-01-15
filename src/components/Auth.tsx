import React, { VFC } from 'react'
import { RefreshIcon } from '@heroicons/react/solid'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Auth: VFC = () => {
  const {
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
  } = useProcessAuth()

  // ローディング時の処理
  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-xl text-gray-600 font-mono">Loading...</h1>
      </div>
    )
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value)
  }

  const onClickRefreshIcon = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <div className="flex items-center">
        <BadgeCheckIcon />
        <span className="text-center text-3xl font-extrabold">
          FARM stack web app
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>
      <form onSubmit={processAuth}>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="email"
            type="email"
            autoFocus
            placeholder="Email address"
            onChange={onChangeEmail}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="password"
            type="password"
            autoFocus
            placeholder="Password"
            onChange={onChangePw}
            value={pw}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            disabled={!email || !pw}
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <RefreshIcon
        onClick={onClickRefreshIcon}
        className="h-8 w-8 my-2 text-blue-500 cursor-pointer"
      />
    </div>
  )
}
