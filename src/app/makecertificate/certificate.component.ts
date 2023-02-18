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
  checkoutForm;
  url: string;

  constructor(private certificateService: CertificateService, private formBuilder: FormBuilder) { 
    this.url = ''
    this.checkoutForm = this.formBuilder.group({
      studentName: '',
      courseName: '',
      teacherCode: '',
      teacherName: '',
      password: '',
      hours: 0
    });
  }

  ngOnInit(): void {
  }

  onSubmit(certificateData: any) {
    this.checkoutForm.disable();
    this.url = "Cargando..."
    this.certificateService.createCertificate(certificateData, certificateData.password).subscribe(response => {
      const r = JSON.parse(response);
      this.url = r.url
      if(!r.error) this.checkoutForm.reset();
      this.checkoutForm.enable();
  });
  }

}
