import { Component, OnChanges, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ITableItem } from '../../models/table-item.interface';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, AfterViewInit {
  displayedColumns;
  dataSource: MatTableDataSource<ITableItem>;
  @Input() tableData: ITableItem[];
  @Input() headers: string[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnChanges() {
    if (this.tableData && this.headers) {
      // remove some columns for layout purpose as these arent really meaningful
      this.headers.splice(7, 6);
      this.displayedColumns = this.headers;
      this.dataSource = new MatTableDataSource(this.tableData);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
