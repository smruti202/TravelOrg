import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public data: any;

    constructor() {
    }

    public getScope(): any {
        return this.data;
    }

    public setScope(scope: any): void {
        this.data = scope;
    }
}
