import {type Todo } from '../types/todos'
import type { Ref } from 'react'

interface todo {
    todo: Todo,
    innerRef?: Ref<HTMLParagraphElement>
}

const TodoCard = ({todo, innerRef}: todo) => {
  return (
    <p ref={innerRef}>{todo.title}</p>
  )
}
export default TodoCard
