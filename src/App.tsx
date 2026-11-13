import { useEffect } from 'react';
import './App.css'
import TodoCard from './components/TodoCard'
import {type Todo } from './types/todos'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from "react-intersection-observer";


function App() {
  const { ref, inView } = useInView({
  });
  const fetchToDos = async ({pageParam} : { pageParam: number }) => {
    const res = (await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`));
    return res.json();
  }
  
  const {data, isPending, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchToDos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length+1 : undefined,
  })

  const todos = data?.pages.map((page : Todo[]) =>
    page.map((todo) => {
      return <TodoCard key={todo.id} todo={todo}/>
    }))
  useEffect(()=>{
    if(!isPending && !isFetching && inView){
      fetchNextPage();
    }
  },[inView])

  if(isPending) {
    return 'loading...'
  }
  return <div className='todo-card'>{todos}
  { hasNextPage &&
  <p ref={ref}>{isFetching && 'loading...'}</p>
  }
  </div>
}

export default App
