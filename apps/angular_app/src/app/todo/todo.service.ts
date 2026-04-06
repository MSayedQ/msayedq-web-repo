import type { ApiHealthResponse, ApiListResponse, Todo, User } from '@repo/shared';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  health(): Observable<ApiHealthResponse> {
    return this.http.get<ApiHealthResponse>(`${this.base}/health`);
  }

  users(): Observable<ApiListResponse<User>> {
    return this.http.get<ApiListResponse<User>>(`${this.base}/users`);
  }

  todos(): Observable<ApiListResponse<Todo>> {
    return this.http.get<ApiListResponse<Todo>>(`${this.base}/todos`);
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.base}/todos`, { title });
  }

  patchTodo(id: string, patch: { completed?: boolean; title?: string }): Observable<Todo> {
    return this.http.patch<Todo>(`${this.base}/todos/${id}`, patch);
  }
}
