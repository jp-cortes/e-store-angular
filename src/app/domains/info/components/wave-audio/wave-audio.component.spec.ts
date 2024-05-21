import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WaveAudioComponent } from './wave-audio.component';


describe('Test for WaveAudioComponent', () => {
  let component: WaveAudioComponent;
  let fixture: ComponentFixture<WaveAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WaveAudioComponent, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create WaveAudioComponent', () => {
    expect(component).toBeDefined();
  });
});