import React, { memo, VFC } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'
import { useDispatch } from 'react-redux'
import { setEditedTask } from '../slices/appSlice'
import { useMutateTask } from '../hooks/useMutateTask'

const TaskItemMemo: VFC<Task> = ({ id, title, description }) => {
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useMutateTask()

  const onClickPencilAltIcon = () => {
    dispatch(
      setEditedTask({
        id: id,
        title: title,
        description: description,
      })
    )
  }

  const onClickTrashIcon = () => {
    deleteTaskMutation.mutate(id)
  }

  return (
    <li>
      <span className="font-bold cursor-pointer">{title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-slate-500 cursor-pointer"
          onClick={onClickPencilAltIcon}
        />
        <TrashIcon
          className="h-5 w-5 text-slate-500 cursor-pointer"
          onClick={onClickTrashIcon}
        />
      </div>
    </li>
  )
}

export const TaskItem = memo(TaskItemMemo)
