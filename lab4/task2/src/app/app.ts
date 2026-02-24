import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <header>
        <h1>🛒 Online Store</h1>
        <p>Discover amazing products from Kaspi.kz</p>
      </header>

      <div class="products-grid">
        @for (product of products; track product.id) {
          <div class="product-card">
            <img [src]="product.image" [alt]="product.name" class="product-image">
            
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>
              
              <div class="meta">
                <span class="price">{{ product.price | number:'1.0-0' }} ₸</span>
                <span class="rating">⭐ {{ product.rating }}</span>
              </div>
              
              <div class="actions">
                <a [href]="product.link" target="_blank" class="btn-primary">
                  View on Kaspi
                </a>
                <button (click)="share(product)" class="btn-share">
                  Share
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }

    header {
      text-align: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      color: white;
      margin-bottom: 40px;
    }

    header h1 {
      margin: 0 0 10px 0;
      font-size: 42px;
    }

    header p {
      margin: 0;
      font-size: 18px;
      opacity: 0.9;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      background: #f5f5f5;
    }

    .product-info {
      padding: 16px;
    }

    .product-info h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: #333;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }

    .description {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .price {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
    }

    .rating {
      font-size: 14px;
      color: #666;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-primary {
      flex: 1;
      background: #ff6b00;
      color: white;
      text-decoration: none;
      padding: 10px 16px;
      border-radius: 6px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.3s;
    }

    .btn-primary:hover {
      background: #e55f00;
    }

    .btn-share {
      background: #25d366;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.3s;
    }

    .btn-share:hover {
      background: #20bd5a;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
      
      header h1 {
        font-size: 32px;
      }
    }
  `]
})
export class App {
  products: Product[] = [
    {
      id: 1,
      name: 'Apple iPhone 15 Pro Max 256GB Blue Titanium',
      description: 'The latest flagship iPhone with A17 Pro chip, titanium design, and advanced camera system. Features USB-C port and Action button.',
      price: 699990,
      rating: 4.9,
      image: 'https://kaspi.kz/img/m/p/h7b/h31/82857596428318.jpg',
      link: 'https://kaspi.kz/shop/p/apple-iphone-15-pro-max-256gb-sinii-113138428/?c=750000000'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra 12GB/256GB Titanium Gray',
      description: 'Premium Samsung flagship with S Pen, 200MP camera, and powerful AI features. Large 6.8-inch Dynamic AMOLED display.',
      price: 599990,
      rating: 4.8,
      image: 'https://kaspi.kz/img/m/p/hf2/h14/84022452035614.jpg',
      link: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-5g-12-gb-256-gb-seryi-116043556/?c=750000000'
    },
    {
      id: 3,
      name: 'Sony PlayStation 5 Slim 1TB White',
      description: 'Next-gen gaming console with lightning-fast SSD, stunning graphics, and immersive DualSense controller. Slim design.',
      price: 329990,
      rating: 4.9,
      image: 'https://kaspi.kz/img/m/p/h54/h44/84656171761694.jpg',
      link: 'https://kaspi.kz/shop/p/sony-playstation-5-slim-114696098/?c=750000000'
    },
    {
      id: 4,
      name: 'Apple MacBook Air 13 M3 8GB/256GB Midnight',
      description: 'Thin and light laptop powered by M3 chip. Perfect for everyday tasks with all-day battery life and stunning Retina display.',
      price: 649990,
      rating: 4.8,
      image: 'https://kaspi.kz/img/m/p/h63/hf5/84373474426910.jpg',
      link: 'https://kaspi.kz/shop/p/apple-macbook-air-13-2024-13-16-gb-ssd-512-gb-macos-mxcv3-118276596/?c=750000000'
    },
    {
      id: 5,
      name: 'Dyson V15 Detect Absolute Vacuum Cleaner',
      description: 'Advanced cordless vacuum with laser detect technology, LCD screen, and powerful suction. Perfect for deep cleaning.',
      price: 449990,
      rating: 4.7,
      image: 'https://kaspi.kz/img/m/p/h4e/hbb/64424509906974.png',
      link: 'https://kaspi.kz/shop/p/dyson-v15-detect-absolute-serebristyi-102269286/?c=750000000'
    },
    {
      id: 6,
      name: 'Apple AirPods Pro 2nd Gen USB-C',
      description: 'Premium wireless earbuds with active noise cancellation, spatial audio, and adaptive transparency mode. USB-C charging.',
      price: 159990,
      rating: 4.9,
      image: 'https://kaspi.kz/img/m/p/h9a/h8f/83618009194526.jpg',
      link: 'https://kaspi.kz/shop/p/naushniki-apple-airpods-pro-2nd-generation-with-wireless-magsafe-charging-case-belyi-113677582/?c=750000000'
    },
    {
      id: 7,
      name: 'LG OLED77C3 77 inch 4K Smart TV',
      description: 'Massive 77-inch OLED TV with perfect blacks, vibrant colors, and webOS smart platform. Ideal for home theater.',
      price: 1299990,
      rating: 4.8,
      image: 'https://kaspi.kz/img/m/p/h8e/h6d/83142482264094.jpg',
      link: 'https://kaspi.kz/shop/p/lg-oled65c5rla-165-sm-chernyi-138621357/?c=750000000'
    },
    {
      id: 8,
      name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
      description: 'Advanced smartwatch with health sensors, fitness tracking, and seamless iPhone integration. Always-on Retina display.',
      price: 249990,
      rating: 4.8,
      image: 'https://kaspi.kz/img/m/p/hc9/h5c/82817731272734.jpg',
      link: 'https://kaspi.kz/shop/p/apple-watch-series-9-gps-45mm-midnight-sportivnyi-remeshok-midnight-106255626/'
    },
    {
      id: 9,
      name: 'DeLonghi Magnifica S ECAM 22.110.B Coffee Machine',
      description: 'Automatic espresso machine with built-in grinder, milk frother, and customizable settings. Perfect coffee at home.',
      price: 219990,
      rating: 4.7,
      image: 'https://kaspi.kz/img/m/p/h5a/hfd/64244535246878.jpg',
      link: 'https://kaspi.kz/shop/p/apple-watch-series-9-gps-m-l-45-mm-sinii-chernyi-113398437/?c=750000000'
    },
    {
      id: 10,
      name: 'Canon EOS R6 Mark II Body Mirrorless Camera',
      description: 'Professional full-frame mirrorless camera with 24MP sensor, advanced autofocus, and 4K 60fps video recording.',
      price: 1499990,
      rating: 4.9,
      image: 'https://kaspi.kz/img/m/p/h0e/h47/84336099590174.jpg',
      link: 'https://kaspi.kz/shop/p/canon-eos-r100-rf-s-18-45mm-rf-s-55-210mm-129064979/?c=750000000'
    }
  ];

  share(product: Product) {
    const message = `Check out this product: ${product.name}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message + ' ' + product.link)}`;
    window.open(url, '_blank');
  }
}
