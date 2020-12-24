import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProposerProjetCpfComponent } from './proposer-projet-cpf.component';

describe('ProposerProjetCpfComponent', () => {
  let component: ProposerProjetCpfComponent;
  let fixture: ComponentFixture<ProposerProjetCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposerProjetCpfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProposerProjetCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
