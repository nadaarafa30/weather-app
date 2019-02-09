import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-error-section',
  templateUrl: './error-section.component.html',
  styleUrls: ['./error-section.component.scss']
})
export class ErrorSectionComponent implements OnInit {
  @Input() Message: string;
  
  constructor() { }

  ngOnInit() {
  }

}
