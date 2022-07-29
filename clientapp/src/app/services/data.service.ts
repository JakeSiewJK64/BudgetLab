import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private datePipe: DatePipe) { }

  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  pipeDateYear(date: Date) {
    return this.datePipe.transform(date, 'yyyy');
  }

  pipeDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  pipeDateMonth(date: Date) {
    return this.datePipe.transform(date, 'MM');
  }

  pipeDateDay(date: Date) {
    return this.datePipe.transform(date, 'dd');
  }

  downloadManager(filename: string, body: any) {
    var url = window.URL.createObjectURL(body.body);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
