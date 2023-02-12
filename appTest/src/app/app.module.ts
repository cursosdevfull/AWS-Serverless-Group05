import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Amplify from 'aws-amplify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_mA3vEZDiP',
    userPoolWebClientId: '5k3o2dgrot4k7n68u05p7r1a9p',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    identityPoolId: 'us-east-1:6a1be0ce-87aa-4322-9bde-7b335262d97f',
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: 'https://0jbqweh0we.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1',
      },
    ],
  },
});

const modulosAngularMaterial = [
  MatFormFieldModule,
  FlexLayoutModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...modulosAngularMaterial,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
