import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatePickerComponent } from './date-picker-component';
import { DatePickerProvider } from '../providers/date-picker-provider';
import { IonicModule } from 'ionic-angular';
 
@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        DatePickerComponent
    ],
    exports: [
        DatePickerComponent,
    ]
})
export class DatePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: [DatePickerProvider]
        };
    }
}