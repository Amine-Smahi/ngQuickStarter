import { Injectable } from '@angular/core';
import { LocalStorageService } from '.';
import { LanguageProperties } from '../_models/LanguageProperties';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    constructor(private localStorageService: LocalStorageService,private http: HttpClient){}

    get(): LanguageProperties {
        var local_lang: LanguageProperties = this.localStorageService.get("language_data");
        if(local_lang == null){
            this.http.get<LanguageProperties>(`${environment.apiUrl}/Language`).subscribe(data => {
                local_lang = data;
            });
            this.localStorageService.set("language_data",JSON.stringify(local_lang));
        }
        return local_lang;
    }
}