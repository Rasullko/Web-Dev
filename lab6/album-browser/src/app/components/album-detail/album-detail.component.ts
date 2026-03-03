import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  editTitle = '';
  loading = true;
  saving = false;
  saveSuccess = false;
  error: string | null = null;
  albumId = 0;

  constructor(private route: ActivatedRoute, private router: Router, private albumService: AlbumService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.albumId = id ? parseInt(id, 10) : 0;
    this.albumService.getAlbum(this.albumId).subscribe({
      next: (data) => { this.album = data; this.editTitle = data.title; this.loading = false; },
      error: () => { this.error = 'Album not found.'; this.loading = false; }
    });
  }

  saveTitle(): void {
    if (!this.album || !this.editTitle.trim()) return;
    this.saving = true;
    const updated: Album = { ...this.album, title: this.editTitle.trim() };
    this.albumService.updateAlbum(updated).subscribe({
      next: (data) => {
        this.album = { ...this.album!, title: data.title || this.editTitle.trim() };
        this.editTitle = this.album.title;
        this.saving = false; this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: () => { this.saving = false; }
    });
  }

  goBack(): void { this.router.navigate(['/albums']); }
  goToPhotos(): void { this.router.navigate(['/albums', this.albumId, 'photos']); }
}
