import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SplashAnimadoComponent } from './splash-animado.component';

describe('SplashAnimadoComponent', () => {
  let component: SplashAnimadoComponent;
  let fixture: ComponentFixture<SplashAnimadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SplashAnimadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashAnimadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
