# Ionic Date Picker Component

This is a date picker component for your Ionic 3 app.


## How to use ###

### 1) Install using npm ###

```
    npm i ionic-date-picker --save
```

### 2) Add it to your ngModule in app.module ###

```
 import { DatePickerModule } from 'ionic-date-picker';
```
```
   imports: [
        IonicModule.forRoot(App),
        DatePickerModule,
    ],
```
### 3) Use the directive ionic-date-picker in your html  ###
```
    <ionic-date-picker (onSelect)="dateSelected($event)"></ionic-date-picker>	
```


## Options ###

 `(onSelect)` - An event that is created when a date is selected. Outputs Date object.
 `[date]` - A date object that sets the selected date in the calendar. (not required. Default is today)
 `[monthLabels]` - An array of month label strings. (not required. Default is ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];)
 `[dayLabels]` - An array of day label strings. (not required. Default is ['S', 'M', 'T', 'W', 'T', 'F', 'S'];)

### 4) Pictures ###

Coming Soon
