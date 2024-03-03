import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamService {
  back_end_url : string = "http://localhost:5000/";
  constructor(private http: HttpClient) { }

  getVideoUrl(): Observable<string> {
    return this.http.get<string>(this.back_end_url + "video");
  }

  uploadVideo(file: File) : void {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>(this.back_end_url + "video", formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error("Error uploading file: ", error);
      }
    });
  }

  getVideoList() : Observable<String[]> {
    return this.http.get(this.back_end_url + "video-list", { responseType: 'arraybuffer' }).pipe(
      map((data: ArrayBuffer) => {
        // Convert byte response to string
        const decoder = new TextDecoder();
        return decoder.decode(data).split('\n'); // Assuming each video URL is separated by a newline
      })
    );  
  }
}
