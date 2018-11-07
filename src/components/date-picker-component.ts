import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day } from 'dayspan';
import { DatePickerProvider } from '../providers/date-picker-provider';
import * as moment from 'moment';

const HTML_CODE = `
<div>
    <ion-item *ngIf="showView === 'calendar'">
        <ion-icon name="calendar" item-start>
        </ion-icon>
        <button ion-button clear (click)="showMonthView()" class="calendar-button">
            {{monthLabels[monthSelected-1]}}
        </button>
        <button ion-button clear (click)="showYearView()" class="calendar-button">
            {{yearSelected}}
        </button>

        <span item-end>
            <button ion-button clear (click)="previous()">
                <ion-icon name="ios-arrow-back"></ion-icon>
            </button>
            <button ion-button clear (click)="next()">
                <ion-icon name="ios-arrow-forward"></ion-icon>
            </button>
        </span>
    </ion-item>

    <ion-grid *ngIf="showView === 'calendar'">
        <ion-row>
            <ion-col *ngFor="let daylabel of dayLabels" text-center class="days-label">
                {{daylabel}}
            </ion-col>
        </ion-row>
        <ion-row *ngFor="let week of weeks">
            <ion-col *ngFor="let day of week" (click)="selectDay(day)" [class.current-item]="isToday(day.dayOfMonth)" [class.item-selected]="daySelected && day.dayIdentifier === daySelected.dayIdentifier"
                text-center>
                <span [class.not-this-month]="!day.inCalendar">{{day.dayOfMonth}}</span>
            </ion-col>
        </ion-row>
    </ion-grid>

    <ion-grid *ngIf="showView === 'month'">
        <ion-row justify-content-end>
            <ion-col text-end>
                <button ion-button icon-only clear (click)="resetView()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col *ngFor="let monthLabel of monthLabels; let i = index" [class.current-item]="i === currentMonth - 1" [class.item-selected]="i === monthSelected - 1"
                class="months-label" col-3 (click)="selectMonth(i+1)" text-center>
                {{monthLabel}}
            </ion-col>
        </ion-row>
    </ion-grid>

    <ion-grid *ngIf="showView === 'year'">
        <ion-row>
            <ion-col col-10 text-center>
                    <div>
                        <button ion-button icon-only clear (click)="showPreviousYears()">
                            <ion-icon name="ios-arrow-back"></ion-icon>
                        </button>
                        <button ion-button clear [disabled]="true" class="year-range">
                            {{startYear}} to {{endYear}}
                        </button>
                    
                        <button ion-button icon-only clear (click)="showNextYears()">
                            <ion-icon name="ios-arrow-forward"></ion-icon>
                        </button>
                    </div>
            </ion-col>
            <ion-col col-2 text-center>
                <button ion-button icon-only clear (click)="resetView()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-col>
        </ion-row> 
        <ion-row>
            <ion-col *ngFor="let year of years" [class.current-item]="year === currentYear" [class.item-selected]="year === yearSelected" class="months-label"
                col-3 (click)="selectYear(year)" text-center>
                {{year}}
            </ion-col>
        </ion-row>
    </ion-grid>
</div>
`;

const CSS_STYLE = `
date-picker-component {
  .not-this-month {
    color: #8b8b8b;
  }

  .item {
      .item-inner {
        border-bottom: none !important;
      }
    }

  .days-label {
    font-weight: 500;
    font-size: 14px;
  }

  .months-label {
    font-size: 15px;
  }

  .calendar-month-label {
    font-weight: 500;
    font-size: 16px;
  }

  .item-selected {
    background: color($colors, primary);
    color: color($colors, light) !important;
  }

  .current-item {
    color: color($colors, secondary);
  }

  .forward-button {
    float: right;
  }

  ion-icon {
    font-size: 25px;
  }

  .year-range {
    font-size: 15px;
    font-weight: 550;
    &.button[disabled] {
      opacity: 1;
      color: gray;
    }
  }

  .calendar-button {
    text-decoration: underline;
    padding-right: 2px !important;
    padding-left: 2px !important;
  }
}
`;

@Component({
  selector: 'ionic-calendar-date-picker',
  template: HTML_CODE,
  styles: [CSS_STYLE]
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
