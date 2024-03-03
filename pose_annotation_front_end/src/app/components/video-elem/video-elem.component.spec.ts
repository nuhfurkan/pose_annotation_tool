import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoElemComponent } from './video-elem.component';

describe('VideoElemComponent', () => {
  let component: VideoElemComponent;
  let fixture: ComponentFixture<VideoElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoElemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
