import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DatePipe } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { AlertdialogComponent } from './components/shared/alertdialog/alertdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent,
    NotfoundComponent,
    FooterComponent,
    AlertdialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
