import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  public getOriginConnectionList(): Observable<any>{
    const apiUrl = 'https://api-uat-ezycommerce.ezyflight.se/api/v1/Airport/OriginsWithConnections/en-us';
    const headers= new HttpHeaders()
  .set('accept', 'text/plain')
  .set('Tenant-Identifier', '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d')
  .set('Channel','web')
  .set('AppContext','Ibe');
    return this.http.get(apiUrl,{ 'headers': headers });

  }
}
