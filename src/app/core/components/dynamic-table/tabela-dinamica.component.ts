import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { TablePrimeColumOptions } from './../../models/TablePrimeColumOptions';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'tabela-dinamica',
  templateUrl: './tabela-dinamica.component.html',
  styleUrls: ['./tabela-dinamica.component.scss']
})
export class TabelaDinamicaComponent implements OnInit, AfterViewInit {

  @Input() columns: TablePrimeColumOptions[];
  @Input() value: any[] = [];
  @Input() paginator: boolean = true;
  @Input() responsive: boolean = true;
  @Input() rowsPerPage: boolean = true;
  @Input() rowsPerPageOptions: number[];
  @Input() paginatorPosition: string = 'bottom';
  @Input() dataKey: string;
  @Input() rows: number = 5;
  @Input() labelGlobalFilter: string = 'Pesquise aqui...';
  @Input() globalFilterFields : string[];
  @Input() caption: string;
  @Input() lazy: boolean = false;
  @Input() totalRecords: number;
  @Input() emptyMessage: string = 'Nenhum registro encontrado';
  @Input() selectionMode: string;
  @Input() exportCSV: boolean = false;
  _selection: any;
  @Output() selectionChange = new EventEmitter();
  @Input() highligthRow: boolean = true;
  @Output() onPaginationSortChange: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tabela') tabela: Table;

  constructor() { }

  @Input()
  get selection() {
    return this._selection;
  }

  set selection(_selection) {
    this._selection = _selection;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateRowsPerPageOptions();
    }, 1000);
  }

  /* @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window.innerWidth)
    console.log(window.innerHeight)
  } */

  isCellPhoneResolution() {
    return window.innerWidth <= 640;
  }

  print(e) {
    console.log(e);
  }

  loadLazy(event: LazyLoadEvent) {
    this.onPaginationSortChange.emit(event);
  }

  updateRowsPerPageOptions() {
    if (this.rowsPerPage) {
      this.rowsPerPageOptions = this.rowsPerPageOptions ? this.rowsPerPageOptions : [5, 10, 20, 50, 100];
      if (this.value && !this.rowsPerPageOptions.includes(this.value.length)) {
        this.rowsPerPageOptions.push(this.value.length);
      }
      if (!this.rowsPerPageOptions.includes(this.rows)) {
        this.rowsPerPageOptions.push(this.rows);
      }
      this.rowsPerPageOptions.sort((a, b) => a < b ? -1 : a > b ? 1 : 0); // sort ascendente
      this.rowsPerPageOptions = [...this.rowsPerPageOptions];
    }
  }

  stringNotEmpty(str: string) {
    return ValidationUtils.stringNotEmpty(str);
  }

  onRowSelectChange(data: any) {
    this.onRowSelect.emit(data.data);
    this.selectionChange.emit(this._selection);
  }

  onRowUnselectChange(data: any) {
    this.onRowUnselect.emit(data.data);
    this.selectionChange.emit(this._selection);
  }

  reset() {
    this.tabela.reset();
  }

  teste(field: any) {
    console.log(field);
    return field;
  }

  fieldRowData(rowData: any, field: string) {
    let arrayField: string[] = [];
    if (field) {
      field = field.concat('.');
      arrayField = field.split('.');
    }
    let value = Object.assign({}, rowData);
    for (let i = 0 ; i < arrayField.length ; i++) {
      const fieldTemp: string = arrayField[i];
      if (fieldTemp && fieldTemp.trim().length > 0) {
        value = value[arrayField[i]];
        if (ValidationUtils.undefinedOrNull(value)) {
          return value;
        }
      }
    }
    return value;
  }

}
