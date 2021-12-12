import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}


  textToCSSModule(cssText: string) {
    const stylesheet: any = new CSSStyleSheet()
    stylesheet.replace(cssText)

    return stylesheet
  }

  async getCSSModule(path: string) {
    const cssText = await this.fetch(path, 'text') as string
    return this.textToCSSModule(cssText)
  }

  attatchCSSModuleToHost(host: any, cssModule: any) {
    host.adoptedStyleSheets = [...host.adoptedStyleSheets, cssModule]
  }

  async loadAndAttachCSSModuleToHost(host: any, cssPath: string) {
    const cssModule = await this.getCSSModule(cssPath)
    this.attatchCSSModuleToHost(host, cssModule)
  }

  async fetch(path: string, responseType: any = 'blob'): Promise<string | Blob | ArrayBuffer | object | []> {
    return this.http.get(path, {responseType}).toPromise()
  }

}
