import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  tagsHistory: string[] = [];

  constructor(private gifsService: GifsService){
    this.tagsHistory = this.gifsService.tagsHistory;

    if ( this.tagsHistory.length === 0 ) return;
    this.searchTag( this.tagsHistory[0]);

  }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag( tag: string) {
    this.gifsService.searchTag( tag );
  }

}
