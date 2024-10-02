import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPublicationsComponent } from './loading-publications.component';

describe('LoadingPublicationsComponent', () => {
  let component: LoadingPublicationsComponent;
  let fixture: ComponentFixture<LoadingPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingPublicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
