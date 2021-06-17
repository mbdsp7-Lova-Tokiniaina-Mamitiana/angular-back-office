import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorService} from './shared/services/error.service';
import {HeaderInterceptor} from './shared/interceptor/header.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: BodyComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  // Insert new paths between this comment and the last path.
  {
    path: 'login',
    component: AuthComponent
  },
  // Last path. Do not add another paths under this one.
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },
];

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatStepperModule,
  ScrollingModule,
  DragDropModule,
  MatTableModule
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BodyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    [... materialModules],
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
