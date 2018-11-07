# Ionic Date Picker Component

This is a date picker component for your Ionic 3 app.


## How to use ###

### 1) Install using npm ###

```
    npm i ionic-calendar-date-picker --save
```

### 2) Add it to your ngModule in app.module ###

```
 import { DatePickerModule, DatePickerComponent, DatePickerProvider } from 'ionic-calendar-date-picker';
```
```
   
@NgModule({
 ...,
  imports: [
    ....
    DatePickerModule,
    ....
  ],
  entryComponents: [
    ....  
    DatePickerComponent,
    ....
  ],
  providers: [
    ....
    DatePickerProvider,
    .....
  ]
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

### 4) Pictures ###

Coming Soon
