import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UnivercityInterface } from '../interfaces/univercity-interface';

@Injectable({
  providedIn: 'root',
})
export class UnivercityService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl =
    'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';

  search(country: string): Observable<UnivercityInterface[]> {
    return this.http.get<UnivercityInterface[]>(this.dataUrl).pipe(
      map(universities =>
        universities.filter(u =>
          u.country.toLowerCase().includes(country.toLowerCase())
        )
      )
    );
  }
}
