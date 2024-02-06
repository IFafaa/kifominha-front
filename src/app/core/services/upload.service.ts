import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  uploadFoodImage(file: any): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(
      `${environment.api}upload/image/food`,
      formData
    );
  }
}
