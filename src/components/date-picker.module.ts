import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatePickerComponent } from './date-picker-component';
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
        };
    }
}