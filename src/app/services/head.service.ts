import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { HeadMetadata } from '@models/head-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class HeadService {
  private ogTitle: HTMLMetaElement;
  private metaDescription: HTMLMetaElement;
  private ogDescription: HTMLMetaElement;
  private canonical: HTMLLinkElement;
  private ogUrl: HTMLMetaElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.ogTitle = this.document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    this.metaDescription = this.document.querySelector('meta[name="description"]') as HTMLMetaElement;
    this.ogDescription = this.document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    this.canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    this.ogUrl = this.document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
  }

  set metadata(metadata: HeadMetadata) {
    this.document.title = metadata.title;
    this.ogTitle.content = metadata.title;
    this.metaDescription.content = metadata.description;
    this.ogDescription.content = metadata.description;
    this.canonical.href = metadata.canonicalUrl;
    this.ogUrl.content = metadata.canonicalUrl;
  }
}
