import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day } from 'dayspan';
import { DatePickerProvider } from '../providers/date-picker-provider';
import * as moment from 'moment';

@Component({
  selector: 'ionic-date-picker',
  templateUrl: 'date-picker-component.html',
})
export class DatePickerComponent implements OnInit {

  @Input() monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  @Input() dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() date: Date;

  @Output() onSelect: EventEmitter<Date> = new EventEmitter();

  showView = 'calendar';
  weeks: Array<Array<Day>>;
  years: Array<number>;

  yearSelected = new Date().getFullYear();
  monthSelected = new Date().getMonth() + 1;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();

  daySelected: Day;
  dayHighlighted: Day;

  startYear: number;
  endYear: number;

  constructor(private datePickerProvider: DatePickerProvider) {
  }

  ngOnInit() {
    this.initOptions();
    this.createCalendarWeeks();
  }

  initOptions() {
    this.yearSelected = this.date ? this.date.getFullYear() : new Date().getFullYear();
    this.monthSelected = this.date ? this.date.getMonth() + 1 : new Date().getMonth() + 1;
    this.dayHighlighted = this.date ? Day.fromDate(this.date) : Day.today();

    if (this.date) {
        this.daySelected = this.dayHighlighted;
    }
  }

  createCalendarWeeks() {
    this.weeks = this.datePickerProvider.generateCalendarWeeks(
        Day.fromMoment(
          moment(this.monthSelected + '-01-' + this.yearSelected, 'MM-DD-YYYY')
        )
      );
  }

  previous() {
    if (this.monthSelected === 1) {
      this.monthSelected = 12;
      this.yearSelected--;
    } else {
      this.monthSelected--;
    }

    this.createCalendarWeeks();
  }

  next() {
    if (this.monthSelected === 12) {
      this.monthSelected = 1;
      this.yearSelected++;
    } else {
      this.monthSelected++;
    }

    this.createCalendarWeeks();
  }

  confirmDay(day: Day) {
    this.onSelect.emit(day.toDate());
  }

  selectDay(day: Day) {
    this.daySelected = day;
    setTimeout(() => {
      this.confirmDay(day);
    }, 200);
  }

  showMonthView() {
    this.showView = 'month';``
  }

  showYearView() {
    this.showView = 'year';
    let startYear = this.yearSelected - 10;
    if (startYear % 10 !== 0) {
      startYear = startYear - (startYear % 10);
    }
    const endYear = startYear + 19;

    this.startYear = startYear;
    this.endYear = endYear;

    this.generateYears();
  }

  generateYears() {
    this.years = [];
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push(i);
    }
  }

  showPreviousYears() {
    this.endYear = this.startYear - 1;
    this.startYear = this.endYear - 19;
    this.generateYears();
  }

  showNextYears() {
    this.startYear = this.endYear + 1;
    this.endYear = this.startYear + 19;
    this.generateYears();
  }

  selectMonth(month: number) {
    this.monthSelected = month;
    this.createCalendarWeeks();
    setTimeout(() => {
      this.showView = 'calendar';
    }, 200);
  }

  selectYear(year) {
    this.yearSelected = year;
    this.createCalendarWeeks();
    setTimeout(() => {
      this.showView = 'calendar';
    }, 200);
  }

  resetView() {
    this.showView = 'calendar';
  }

  isToday(day) {
    return this.yearSelected === this.currentYear && this.monthSelected === this.currentMonth && this.currentDay === day;
  }

}
