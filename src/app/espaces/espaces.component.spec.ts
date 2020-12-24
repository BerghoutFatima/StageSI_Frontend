import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EspacesComponent } from './espaces.component';

describe('EspacesComponent', () => {
  let component: EspacesComponent;
  let fixture: ComponentFixture<EspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
