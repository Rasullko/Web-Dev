import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryList } from './components/category-list/category-list';
import { ProductList } from './components/product-list/product-list';
import { RouterOutlet } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CategoryList, ProductList, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  private readonly apiBaseUrl = '/api';
  private readonly categoriesFallbackUrl = '/categories.json';
  private readonly productsFallbackUrl = '/products.json';

  categories: Category[] = [];
  products: Product[] = [];
  isLoadingCategories = true;
  isLoadingProducts = false;
  errorMessage = '';
  selectedCategoryId: number | null = null;
  filteredProducts: Product[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoadingCategories = false;
      return;
    }

    this.http
      .get<Category[]>(`${this.apiBaseUrl}/categories/`)
      .pipe(
        timeout(3000),
        catchError(() => this.http.get<Category[]>(this.categoriesFallbackUrl))
      )
      .subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoadingCategories = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoadingCategories = false;
        this.errorMessage = 'Failed to load categories from Django.';
        console.error('Failed to load categories', err);
        this.cdr.detectChanges();
      },
    });
  }

  onCategorySelect(id: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.selectedCategoryId = id;
    this.isLoadingProducts = true;
    this.errorMessage = '';

    this.http
      .get<Product[]>(`${this.apiBaseUrl}/categories/${id}/products/`)
      .pipe(
        timeout(3000),
        catchError(() =>
          this.http.get<Product[]>(this.productsFallbackUrl).pipe(
            catchError(() => of([] as Product[]))
          )
        )
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = data.filter((product) => product.categoryId === id);
          this.isLoadingProducts = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.products = [];
          this.filteredProducts = [];
          this.isLoadingProducts = false;
          this.errorMessage = 'Failed to load products for the selected category.';
          console.error('Failed to load products', err);
          this.cdr.detectChanges();
        },
      });
  }
}
