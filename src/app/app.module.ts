import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { DetailListComponent } from './detail-list/detail-list.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { RouterModule, Routes } from '@angular/router';
import { GeologyInfoComponent } from './geology-info/geology-info.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'location', pathMatch: 'full' },
  { path: 'location', component: WeatherInfoComponent, pathMatch: 'full' },
  { path: 'geology', component: GeologyInfoComponent, pathMatch: 'full' },
  { path: 'forecast', component: ChartListComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    NavigationComponent,
    SearchComponent,
    CardListComponent,
    CardComponent,
    DetailListComponent,
    DetailItemComponent,
    ChartComponent,
    ChartListComponent,
    GeologyInfoComponent,
    WeatherInfoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
