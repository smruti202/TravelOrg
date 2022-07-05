import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../service/message.service';
@Component({
  selector: 'app-show-flight',
  templateUrl: './show-flight.component.html',
  styleUrls: ['./show-flight.component.css']
})
export class ShowFlightComponent implements OnInit {
  searchInputParam: any;
  constructor(
    private readonly messageService: MessageService
  ) { 
    this.searchInputParam = this.messageService.getScope();
  }

  ngOnInit(): void {
  }

  
}
