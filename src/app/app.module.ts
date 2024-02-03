import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    HeaderComponent,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
