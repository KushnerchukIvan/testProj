import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnivercityService } from './services/univercity-service';
import { UnivercityInterface } from './interfaces/univercity-interface';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly univercityService = inject(UnivercityService);

  searchQuery = signal('');
  universities = signal<UnivercityInterface[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  hasSearched = signal(false);

  savedCount = computed(() => 
    this.universities().filter(u => u.saved).length
  );

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
  }
}
