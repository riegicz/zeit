import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
import {AppComponent} from './app.component';
import {InputDayComponent} from './components/input-day/input-day.component';
import {InputMonthComponent} from './components/input-month/input-month.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BackendService} from './services/backend.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './components/alert/alert.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TimePipe} from './pipes/time.pipe';
import {OverviewComponent} from './components/overview/overview.component';
import {AppRoutingModule} from './app-routing.module';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    InputDayComponent,
    InputMonthComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    TimePipe,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
  ],
  exports: [
    TimePipe,
  ],
  entryComponents: [
    SpinnerComponent,
  ],
  providers: [
    BackendService,
    {provide: LOCALE_ID, useValue: 'de'},
  ],
  bootstrap: [AppComponent,
  ]
})
export class AppModule {
}
