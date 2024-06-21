import { Component, computed, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-todoo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todoo.component.html',
  styleUrl: './todoo.component.css'
})
export class TodooComponent {
  todolist = signal<TodoModel[]>([
    {
      id: 1,
      title: 'buy milk',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'buy milk',
      completed: true,
      editing: false
    }
  ])


  filter = signal<FilterType>('all')

  todosListFiltered = computed(()=> {
    const filter = this.filter()
    const todos = this.todolist()


    switch(filter){
      case 'active':
        return todos.filter((todo)=> !todo.completed)

      case 'completed':
        return todos.filter((todo)=> todo.completed)

      default:
        return todos
    }
  })

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  })

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString)
  }

  addTodo() {
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      this.todolist.update((prev_todos) => [
        ...prev_todos,
        { id: Date.now(), title: newTodoTitle, completed: false, editing: false }
      ]);

      this.newTodo.reset()
    } else {
      this.newTodo.reset()
    }
  }

  toggleTodo(todoId: number) {
    this.todolist.update((prev_todos) =>
      prev_todos.map(todo => {
        return todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      })
    );
  }


  removeTodo(todoId: number) {
    this.todolist.update((prev_todos) => prev_todos.filter((todo) => todo.id !== todoId))
  }

  updateTodoEditingModel(todoId: number) {
    return this.todolist.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoId ?
          { ...todo, editing: true } :
          { ...todo, editing: false }
      })
    )
  }

  saveTitleTodo(todoId: number, event: Event) {
    const title = (event.target as HTMLInputElement).value
    return this.todolist.update((prev_todos) => prev_todos.map((todo) => {
      return todo.id === todoId ? { ...todo, title: title, editing: false } : todo
    }))
  }

}



