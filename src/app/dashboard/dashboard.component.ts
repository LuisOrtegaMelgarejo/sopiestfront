import { Component, OnInit } from '@angular/core';
import { Detalle, ReporteCertificado } from '../certificate';
import { CertificateService } from '../certificate.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  reporte: ReporteCertificado[] = [];
  yearSelected: ReporteCertificado | null = null;
  monthSelected: Detalle | null = null;

  constructor(private certificateService: CertificateService, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log('DashboardComponent.ngOnInit');
    if(!this.loginService.isAlreadyLogin()) {
      this.loginService.sendToRoute('login');
    };
    this.getReport();
  }

  getReport(): void {
    this.certificateService.getReport()
    .subscribe(reporte => this.reporte = reporte);
  }

  selectAnno(anno: number): void {
    this.yearSelected = this.reporte.filter(y => y.anno === anno)[0];
  }

  selectMes(mes: string): void {
    const data = this.yearSelected?.detalle.filter(y => y.mes === mes)[0] ?? null;
    if (data?.detalle?.length ?? 0 > 0) {
      this.monthSelected = data;
    }
  }

  eliminar(id: number) {
    this.certificateService.delete(id)
    .subscribe((result: any) => {
      if(!result.error) {
        const pos = this.monthSelected?.detalle.findIndex(x => x.id === id)
        if(pos) {
          this.monthSelected?.detalle.splice(pos, 1);
        }
      }
    });
  }

}
