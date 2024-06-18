import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory:string[] = [];

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'MiQEymE5MdcFAqaSxF66nCQb4bR9vPAt';
  private limit: string = '10';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory(){
    return [...this._tagsHistory];
  }


  async searchTag( tag:string):Promise<void>{
    if( tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit)
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search?`, { params })
    .subscribe( resp => {
      this.gifList = resp.data;
      // console.log({ gifs: this.gifList})
    }
    )

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=MiQEymE5MdcFAqaSxF66nCQb4bR9vPAt&q=valorant&limit=10')
    // .then(res => res.json())
    // .then( data => console.log(data))
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag )
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if ( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
  }

}
