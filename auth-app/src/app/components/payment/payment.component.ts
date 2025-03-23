import { AfterViewInit, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  private payboxInitialized = false; // Para evitar múltiples inicializaciones

  constructor(private service: AuthService) {}

  ngAfterViewInit() {
    this.loadScript().then(() => {
      if (!this.payboxInitialized) {
        this.setupPayment();
        this.payboxInitialized = true;
      }
    });
  }

  setupPayment() {
    console.log('Configurando Paybox...');
    
    (window as any).data = {
      PayboxRemail: 'dmorales@pagoplux.com',
      PayboxSendmail: 'andresloa.al@gmail.com',
      PayboxRename: 'dmorales',
      PayboxSendname: 'Test',
      PayboxBase0: '2.0',
      PayboxBase12: '10.0',
      PayboxDescription: 'Descripcion del pago',
      PayboxLanguage: 'es',
      PayboxDirection: 'Quito',
      PayBoxClientPhone: '1234567890',
      PayboxProduction: false,
      PayboxRecurrent: false,
      PayboxIdPlan: '',
      PayboxPermitirCalendarizar: false,
      PayboxPagoInmediato: true,
      PayboxCobroPrueba: false,
      PayBoxClientIdentification: '',
      PayboxAmountVariablePlan: false,
      PayboxFrequencyPlan: 'MEN',
      PayboxTieneIvaPlan: true,
      PayboxDescriptionPlan: 'Descripcion plan',
      PayboxEnvironment: 'sandbox',
      PayboxPagoPlux: false,
      PayboxIdElement: 'ButtonPaybox',
    };

    (window as any).onAuthorize = function (response: any) {
      if (response.status === 'succeeded') {
        console.log('Pago exitoso:', response);
      }
    };
  }

  async loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('payboxScript')) {
        console.log('Script Paybox ya cargado.');
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sandbox-paybox.pagoplux.com/paybox/index.js';
      script.id = 'payboxScript';
      script.onload = () => {
        console.log('Script Paybox cargado correctamente.');
        resolve();
      };
      script.onerror = () => reject(new Error('Error al cargar el script de Paybox'));
      document.head.appendChild(script);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
