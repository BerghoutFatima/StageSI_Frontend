import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EspacesCPFComponent } from './espaces-cpf.component';

describe('EspacesCPFComponent', () => {
  let component: EspacesCPFComponent;
  let fixture: ComponentFixture<EspacesCPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacesCPFComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EspacesCPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
