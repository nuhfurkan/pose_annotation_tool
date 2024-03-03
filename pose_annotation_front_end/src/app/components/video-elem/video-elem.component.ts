import { Component, OnInit } from '@angular/core';
import { VideoStreamService } from '../../services/video-stream.service';

@Component({
  selector: 'app-video-elem',
  standalone: true,
  imports: [],
  templateUrl: './video-elem.component.html',
  styleUrl: './video-elem.component.css'
})
export class VideoElemComponent implements OnInit {
  videoUrl?: string;

  constructor(private videoService: VideoStreamService) { }
  
  ngOnInit(): void {
    this.getVideoUrl();
  }

  getVideoUrl() {
    this.videoService.getVideoUrl().subscribe({
      next: (url) => {
        this.videoUrl = url;
      },
      error: (error) => {
        console.error('Error fetching video URL:', error);
      }
    });
  }

}
