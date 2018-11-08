# Ionic Date Picker Component

This is a date picker component for your Ionic 3 app.


## How to use ###

### 1) Install using npm ###

```
    npm i ionic-calendar-date-picker --save
```

### 2) Add it to your ngModule in app.module ###

```
import { DatePickerModule } from 'ionic-calendar-date-picker';
```
```
   
@NgModule({
 ...,
  imports: [
    ....
    DatePickerModule
    ....
  ],
  ....
})
export class AppModule {}
```
### 3) Use the directive ionic-calendar-date-picker in your html  ###
```
    <ionic-calendar-date-picker (onSelect)="dateSelected($event)"></ionic-calendar-date-picker>	
```


## Options ###

 `(onSelect)` - An event that is created when a date is selected. Outputs Date object.
 `[date]` - A date object that sets the selected date in the calendar. (not required. Default is today)
 `[monthLabels]` - An array of month label strings. (not required. Default is ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];)
 `[dayLabels]` - An array of day label strings. (not required. Default is ['S', 'M', 'T', 'W', 'T', 'F', 'S'];)

## Styling Options ###
  ```
    <ionic-calendar-date-picker [notInCalendarStyle]="{'color': 'red', 'font-weight': 'bold'}"></ionic-calendar-date-picker>
  ```
  `[notInCalendarStyle]` - When a day is not in the calendar. Not Required. Default: { 'color': '#8b8b8b' };
  `[dayLabelsStyle]` - Day Label styling (S, M, T, W ... ). Not Required. Default: { 'font-weight': 500, 'font-size': '14px' };
  `[monthLabelsStyle]` - Month Label Styling (Jan, Feb, Mar ... ). Not Required. Default: {  'font-size': '15px' };
  `[yearLabelsStyle]` - Year Label Styling (2000, 2001 ...). Not Required. Default: {  'font-size': '15px' };
  `[itemSelectedStyle]` - Styling on selected Item by the user. Not Required. Default: { 'background': '#488aff', 'color': '#f4f4f4 !important' };
  `[todaysItemStyle]` - Styling on showing todays Day, Month, Year. Not Required. Default: { 'color': '#32db64' };

### 4) Pictures ###

Coming Soon
