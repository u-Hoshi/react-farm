import React, { VFC } from 'react'
import { LoginIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Todo: VFC = () => {
  const { logout } = useProcessAuth()
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <LoginIcon
        onClick={logout}
        className="h-7 w-7 mt-1 mb-5 text-blue-500 cursor-pointer"
      />
    </div>
  )
}
