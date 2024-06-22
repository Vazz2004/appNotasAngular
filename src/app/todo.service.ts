import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoModel } from "./models/todo";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiUrl = 'http://localhost:8000/api/todos'
  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.apiUrl);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.apiUrl, todo);
  }

  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
