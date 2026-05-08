import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnivercityInterface } from '../interfaces/univercity-interface';

@Injectable({
  providedIn: 'root',
})
export class UnivercityService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://universities.hipolabs.com/search';

  search(country: string): Observable<UnivercityInterface[]> {
    return this.http.get<UnivercityInterface[]>(
      `${this.apiUrl}?country=${encodeURIComponent(country)}`
    );
  }
}
