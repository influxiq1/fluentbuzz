import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { ContactusComponent } from './contactus/contactus.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'influencers', component: InfluencersComponent},
  { path: 'contactus', component: ContactusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
