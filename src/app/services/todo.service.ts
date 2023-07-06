import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Task } from '../interfaces/todo-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  getTasksById(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${id}`);
  }

  saveTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}`, task);
  }

  updateTask(id:number, task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id:number): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}`);
  }

  updateTaskStatus(taskId: number, task: Task, newStatus: string): Observable<void> {
    task.status = newStatus;
    return this.updateTask(taskId, task).pipe(
      map(() => {}),
      catchError((error: any) => {
        console.error('Error updating task status:', error);
        return throwError('Failed to update task status');
      })
    );
  }



}
