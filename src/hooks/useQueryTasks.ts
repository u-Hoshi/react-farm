import { useQuery } from 'react-query'
import axios from 'axios'
import { Task } from '../types/types'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      `${process.env.REACT_APP_API_URL}/todo`,
      { withCredentials: true }
    )
    return data
  }
  // useQueryはRESTAPIからgetメソッドでデータを取得し、キャッシュに保存してくれる
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: Infinity,
  })
}
