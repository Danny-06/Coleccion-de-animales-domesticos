import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { RequestService } from './services/request/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AppComponent implements OnInit {
  title = 'Angular-Empty-Project';

  static defaultCSSPath = 'assets/css/custom-default.css'

  root = this.element.nativeElement
  host = this.root.shadowRoot

  constructor(private router: Router, private element: ElementRef, private req: RequestService) {}

  goToHome() {
    this.router.navigateByUrl('/main')
  }

  goToUsers() {
    this.router.navigateByUrl('/user')
  }

  async ngOnInit() {
    // Remove 'router-outlet' from the app-root
    this.host?.querySelector('router-outlet')?.remove()

    // Load Default stylesheet
    const {defaultCSSPath} = AppComponent
    
    const doc: any = document
    this.req.loadAndAttachCSSModuleToHost(doc, defaultCSSPath)
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

  }
  
}
