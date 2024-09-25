import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResizableDirective } from './resizable.directive'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ResizableDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
