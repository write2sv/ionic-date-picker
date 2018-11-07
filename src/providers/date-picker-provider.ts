import { Injectable } from '@angular/core';
import { Calendar, Day } from 'dayspan';

@Injectable()
export class DatePickerProvider {
    generateCalendarWeeks(forDay: Day): Array<any> {
        const weeks: Array<any> = [];
        const month = Calendar.months<string, any>(1, forDay);
        const numOfWeeks = month.days.length / 7;

        let dayIndex = 0;
        for (let week = 0; week < numOfWeeks; week++) {
            const days = [];
            for (let day = 0; day < 7; day++) {
                days.push(month.days[dayIndex]);
                dayIndex++;
            }
            weeks.push(days);
        }
        return weeks;
    }

    generateYears(fromDate: Date, toDate: Date): Array<number> {
        const startYear = fromDate.getFullYear();
        const endYear = toDate.getFullYear();
        const years = [];
        for (let i = endYear; i >= startYear ; i--) {
            years.push(i);
        }

        return years;
    }
}