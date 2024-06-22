import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todoo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todoo.component.html',
  styleUrls: ['./todoo.component.css']
})
export class TodooComponent implements OnInit {
  todolist = signal<TodoModel[]>([]);
  filter = signal<FilterType>('all');
  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });


  todosListFiltered = computed(() => {
    const filter = this.filter()
    const todos = this.todolist()


    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed)

      case 'completed':
        return todos.filter((todo) => todo.completed)

      default:
        return todos
    }
  })

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todolist.set(todos);
    });
  }

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  addTodo() {
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      const newTodo: TodoModel = {
        id: Date.now(),
        title: newTodoTitle,
        completed: false,
        editing: false
      };

      this.todoService.addTodo(newTodo).subscribe(todo => {
        this.todolist.update(prevTodos => [...prevTodos, todo]);
        this.newTodo.reset();
      });
    }
  }

  toggleTodo(todoId: number) {
    const todo = this.todolist().find(todo => todo.id === todoId);
    if (todo) {
      this.todoService.updateTodo({ ...todo, completed: !todo.completed }).subscribe(updatedTodo => {
        this.todolist.update(prevTodos => prevTodos.map(t => t.id === todoId ? updatedTodo : t));
      });
    }
  }

  removeTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todolist.update(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    });
  }

  updateTodoEditingModel(todoId: number) {
    this.todolist.update(prevTodos => prevTodos.map(todo => todo.id === todoId ? { ...todo, editing: true } : { ...todo, editing: false }));
  }

  saveTitleTodo(todoId: number, event: Event) {
    const title = (event.target as HTMLInputElement).value;
    const todo = this.todolist().find(todo => todo.id === todoId);
    if (todo) {
      this.todoService.updateTodo({ ...todo, title, editing: false }).subscribe(updatedTodo => {
        this.todolist.update(prevTodos => prevTodos.map(t => t.id === todoId ? updatedTodo : t));
      });
    }
  }
}
