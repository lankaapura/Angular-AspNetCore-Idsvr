import { Component, Inject } from '@angular/core';
import { HttpService } from "@app/services/http.service";

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public idsvrTest: any;

    constructor(http: HttpService, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result as WeatherForecast[];
        }, error => console.error(error));

        http.get('https://demo.identityserver.io/api/test').subscribe(result => {
            this.idsvrTest = result;
        }, error => console.error(error));
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
