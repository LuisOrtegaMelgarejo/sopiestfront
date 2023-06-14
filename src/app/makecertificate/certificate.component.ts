import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReporteCertificado } from '../certificate';
import { CertificateService } from '../certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certificates: ReporteCertificado[] = [];
  firmas: any[] = [];
  logos: any[] = [];
  checkoutForm;
  url: string;

  constructor(private certificateService: CertificateService, private formBuilder: FormBuilder) { 
    this.url = ''
    this.checkoutForm = this.formBuilder.group({
      logoCode: '',
      studentName: '',
      date: new Date(),
      courseName: '',
      teacherCode: '',
      password: '',
      hours: 0,
      customId: null,
    });
  }

  ngOnInit(): void {
    this.certificateService.getConfig(0).subscribe(response => {
      this.logos = response;
    })
    this.certificateService.getConfig(1).subscribe(response => {
      this.firmas = response;
    })
  }

  onSubmit(certificateData: any) {
    this.checkoutForm.disable();
    this.url = "Cargando..."
    this.certificateService.createCertificate({ ...certificateData, rectorCode: 'rector' }, certificateData.password).subscribe(response => {
      const r = JSON.parse(response);
      this.url = r.url
      if(!r.error) this.checkoutForm.reset();
      this.checkoutForm.enable();
  });
  }

}
