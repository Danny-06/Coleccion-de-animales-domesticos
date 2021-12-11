import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}


  async getFileAsText(path: string): Promise<string> {
    const text = await this.http.get(path, {responseType: 'text'}).toPromise()
    .catch(obj => console.error(obj.error.error)) ?? ''

    return text
  }

  textToCSSModule(cssText: string) {
    const stylesheet: any = new CSSStyleSheet()
    stylesheet.replace(cssText)

    return stylesheet
  }

  async getCSSModule(path: string) {
    const cssText = await this.getFileAsText(path)
    return this.textToCSSModule(cssText)
  }

  attatchCSSModuleToHost(host: any, cssModule: any) {
    host.adoptedStyleSheets = [...host.adoptedStyleSheets, cssModule]
  }

  async loadAndAttachCSSModuleToHost(host: any, cssPath: string) {
    const cssModule = await this.getCSSModule(cssPath)
    this.attatchCSSModuleToHost(host, cssModule)
  }

}
