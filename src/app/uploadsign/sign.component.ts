import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CertificateService } from '../certificate.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  uploadForm;
  result: string = '';
  file: File| undefined;
  formData: FormData | undefined;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(private certificateService: CertificateService, private formBuilder: FormBuilder, private loginService: LoginService) { 
    this.uploadForm = this.formBuilder.group({
      password: '',
      configCode: '',
      configName: '',
      configType: '0',
    });
    this.fileUpload = {} as ElementRef
  }

  ngOnInit(): void {
    if(!this.loginService.isAlreadyLogin()) {
      this.loginService.sendToRoute('login');
    };
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.file = file;
    }
  } 

  onSubmit(signData: any) {
    if (!this.file) return;
    this.formData = new FormData();
    this.formData.append("config", this.file);
    this.formData.append("configCode", signData.configCode);
    this.formData.append("configName", signData.configName);
    this.formData.append("configType", signData.configType);
    this.uploadForm.disable();
    this.result = "Cargando..."
    this.certificateService.uploadConfig(this.formData, signData.password).subscribe(resp => {
      this.result = resp
      this.file = undefined;
      this.fileUpload.nativeElement.value = null;
      this.uploadForm.reset();
      this.uploadForm.enable();
    });
  }

}
