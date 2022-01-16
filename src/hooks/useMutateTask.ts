import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useQueryClient, useMutation } from 'react-query'
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice'
import { Task } from '../types/types'
import { useHistory } from 'react-router-dom'

export const useMutateTask = () => {
  const history = useHistory()
  const QueryClient = useQueryClient()
  const dispatch = useDispatch()

  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/todo`, task, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const previousTodos = QueryClient.getQueryData<Task[]>('task')
        if (previousTodos) {
          QueryClient.setQueriesData('task', [...previousTodos, res.data])
        }
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          history.push('/')
        }
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: Task) =>
      axios.put<Task>(
        `${process.env.REACT_APP_API_URL}/todo/${task.id}`,
        {
          title: task.title,
          description: task.description,
        },
        { withCredentials: true }
      ),
    {
      onSuccess: (res, variables) => {
        // 第一引数にはuseMutationの第一引数で渡した関数の結果、第二引数にはuseMutationで渡したデータ(今回だとtask)を取得する
        const previousTodos = QueryClient.getQueryData<Task[]>('task')
        if (previousTodos) {
          QueryClient.setQueryData<Task[]>(
            'task',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          history.push('/')
        }
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: string) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/todo/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = QueryClient.getQueryData<Task[]>('task')
        if (previousTodos) {
          QueryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTask())
          history.push('/')
        }
      },
    }
  )
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}
