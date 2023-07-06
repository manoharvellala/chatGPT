import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousChatsComponent } from './components/previous-chats/previous-chats.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'previous-chats/:category.name', component: PreviousChatsComponent },
  { path: '**', redirectTo: 'layout' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
