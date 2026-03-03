import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = true;
  error: string | null = null;
  deletingIds = new Set<number>();

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void { this.loadAlbums(); }

  loadAlbums(): void {
    this.loading = true;
    this.error = null;
    this.albumService.getAlbums().subscribe({
      next: (data) => { this.albums = data; this.loading = false; },
      error: () => { this.error = 'Failed to load albums.'; this.loading = false; }
    });
  }

  deleteAlbum(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.deletingIds.add(id);
    this.albumService.deleteAlbum(id).subscribe({
      next: () => { this.albums = this.albums.filter(a => a.id !== id); this.deletingIds.delete(id); },
      error: () => { this.deletingIds.delete(id); }
    });
  }

  isDeleting(id: number): boolean { return this.deletingIds.has(id); }
}
