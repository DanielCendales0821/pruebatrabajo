import { Injectable, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private spinner: NgxSpinnerService) {
  }

  public abrirSpinner() {
    this.spinner.show();
  }

  public cerrarSpinner() {
    this.spinner.hide();
  }

  public abrirConfirmacion(): any {
    const observable = new Observable(observer => {
      Swal.fire({
        title: '¿Está seguro?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '¡Cancelar!',
        confirmButtonText: '¡Confirmar!'
      }).then((result) => {
        if (result.value) {
          observer.next(true);
        }
      });
    });
    return observable;
  }

  abrirMensaje(msg, type) {
    let title = 'Mensaje';
    if (type === 'success') {
      title = '!Buen trabajo!';
    } else {
      title = 'Error';
    }

    Swal.fire(
      title,
      msg,
      type
    );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
