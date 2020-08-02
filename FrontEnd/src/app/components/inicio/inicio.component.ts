import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private readonly generalService: GeneralService) { }
  public requerimientos: any = [];
  ngOnInit() {
  }

  exportar() {
    this.generalService.exportAsExcelFile(this.requerimientos, 'requerimientos' + new Date());
  }

}
