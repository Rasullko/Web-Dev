import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = true;
  error: string | null = null;
  albumId = 0;
  hoveredId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private albumService: AlbumService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.albumId = id ? parseInt(id, 10) : 0;
    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => { this.photos = data; this.loading = false; },
      error: () => { this.error = 'Failed to load photos.'; this.loading = false; }
    });
  }

  goBack(): void { this.router.navigate(['/albums', this.albumId]); }
  setHovered(id: number | null): void { this.hoveredId = id; }
}
