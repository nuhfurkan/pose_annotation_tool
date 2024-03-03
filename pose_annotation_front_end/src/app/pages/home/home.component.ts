import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoStreamService } from '../../services/video-stream.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentFile?: File;
  message = '';
  fileInfos?: Observable<String[]>;
  videoUrl?: string;
  videoService = new VideoStreamService(this.http);

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fileInfos = this.videoService.getVideoList();
  }

  onFileSelected(event: any): void {
  }

  selectFile(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.videoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.currentFile = event.target.files[0];
  }

  upload(event: any): void {
    this.videoService.uploadVideo(this.currentFile!);
  }

  onTimeUpdate() {
  }
}
