import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnivercityService } from './services/univercity-service';
import { UnivercityInterface } from './interfaces/univercity-interface';

const STORAGE_KEY = 'uni_search_state';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  private readonly univercityService = inject(UnivercityService);

  searchQuery = signal('');
  universities = signal<UnivercityInterface[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  hasSearched = signal(false);

  savedCount = computed(() => 
    this.universities().filter(u => u.saved).length
  );

  constructor() {
    effect(() => {
      if (!this.hasSearched()) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        searchQuery: this.searchQuery(),
        universities: this.universities(),
      }));
    });
  }

  ngOnInit(){
    this.loadState();
  }

  private loadState(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const state = JSON.parse(raw);
      this.searchQuery.set(state.searchQuery ?? '');
      this.universities.set(state.universities ?? []);
      this.hasSearched.set(this.universities().length > 0);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  onSubmit(){
    const query = this.searchQuery().trim();
    if (!query) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.universities.set([]);

    this.univercityService.search(query).subscribe({
      next: (data) => {
        this.universities.set(data);
        this.hasSearched.set(true);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Помилка запиту');
        this.isLoading.set(false);
      }
    });
  }

  toggleSave(index: number){
    this.universities.update(list =>
      list.map((uni, i) => 
      i === index ? {...uni, saved: !uni.saved} : uni)
    );
  }

  onReset(){
    this.searchQuery.set('');
    this.universities.set([]);
    this.hasSearched.set(false);
    this.errorMessage.set('');
    localStorage.removeItem(STORAGE_KEY);
  }
}
