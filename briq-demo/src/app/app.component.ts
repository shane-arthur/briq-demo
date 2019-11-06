import { Component } from '@angular/core';
import { DataService } from '../app/services/data-service.service';
import * as XLSX from 'xlsx';
import { ITableItem } from './models/table-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'briq-demo';
  data: any;
  tableData : ITableItem[];
  headers: string[];
  constructor(private dataService: DataService) {
  }


  uploadFile(data) {
    const target: DataTransfer = <DataTransfer>(data.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      const result = this.dataService.filterAndTransformData(this.data);
      this.tableData = result[0];
      this.headers = result[1];
      this.logRelevenceScore();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  logRelevenceScore(){
    console.log(this.dataService.returnRelevencyScore());
  }

}

