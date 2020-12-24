import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeposerComponent } from './deposer.component';

describe('DeposerComponent', () => {
  let component: DeposerComponent;
  let fixture: ComponentFixture<DeposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeposerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
