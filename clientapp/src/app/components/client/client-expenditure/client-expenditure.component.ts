import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { DataService } from 'src/app/services/data.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-client-expenditure',
  templateUrl: './client-expenditure.component.html',
  styleUrls: ['./client-expenditure.component.scss'],
})
export class ClientExpenditureComponent implements AfterViewInit {
  constructor(
    private _expenseService: ExpenditureService,
    private _dataService: DataService
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<ExpenseDto>();
  displayedColumns = ['description', 'total'];
  sortData(sort: any) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
      switch (sort.active) {
        case 'description':
          return this._dataService.compare(a.description, b.description, isAsc);
        case 'total':
          return this._dataService.compare(a.total, b.total, isAsc);
        default:
          return 0;
      }
    });
  }
  onTableRowClick(row: ExpenseDto) {}
  ngAfterViewInit(): void {
    this._expenseService.getExpenses().subscribe({
      next: (x) => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
      },
    });
  }
}
