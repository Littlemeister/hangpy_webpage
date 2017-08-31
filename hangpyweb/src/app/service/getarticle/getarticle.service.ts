import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetarticleService {

  url:"http://partlight.tech/scripts/hangpy/backend.php";
  params:"action=queue_verification";
  token:"123";
  articles = [
    { pic:"url",
      title:"Title name1",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name2",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name3",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name4",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name5",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name6",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name7",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name8",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
    { pic:"url",
      title:"Title name9",
      distance:"less than 1km",
      time:"18.30-23.00",
      catagory:"Football"
    },
  ]; /* Get this from database */

  results: string[]; /* Respons-message fromm server */

  constructor(private http: Http) { }

  onGetResult(response){  this.results = response;  console.log("onGetResult ",this.results); }
  onGetError(response2){  console.log("onGetError ", response2);  }
  onGetComplete(){        console.log("complete");  }

  myData() {
   //console.log(this.http.get('http://partlight.tech/scripts/hangpy/backend.php/?action=queue_verification').map((res:Response) => res.json()));*/
   //console.log(this.http.post('http://partlight.tech/scripts/hangpy/backend.php?out=events&user=%2B46721521129&token=123', {action:'queue_verification', phone_num:'+46721521129', verif_code:'123'}).map((res:Response) => res.json()));


     /* GET */
    // var data = {
    //   out:'events',
    //   user:'+46721521129',
    //   token:'123'
    //
    //   //action:'queue_verification',
    //   //phone_num:'+46721521129',
    //   //verif_code:'123'
    // };

    // let params = new URLSearchParams();
    // for(let key in data) {
    //     params.set(key, data[key]);
    // }
    // let options = new RequestOptions({
    //     search: params
    // });
    //
    // this.http.get('http://partlight.tech/scripts/hangpy/backend.php', options).map((res:Response) => res.json()).subscribe(
    //   (response) => this.onGetResult(response),
    //   (error) => this.onGetError(error.catch(error => Observable.throw("Error in x service"))),
    //   () => this.onGetComplete()
    // );
/* END GET */

/* POST */
    //  this.http.post('http://partlight.tech/scripts/hangpy/backend.php', {
    //      //action:'queue_verification',
    //      phone_num:'+46721521129',
    //      verif_code:'123'
    //    }).map((res:Response) => res.json()).subscribe(
    //    (response) => this.onGetResult(response),
    //    (error) => this.onGetError(error.catch(error => Observable.throw("Error in x service"))),
    //    () => this.onGetComplete()
    //  );
/* END POST */

//http://partlight.tech/scripts/hangpy/backend.php?out=events&user=%2B46721521129&token=123

    /*this.http.post('http://partlight.tech/scripts/hangpy/backend.php', {
        action:'queue_verification',
        phone_num:'+46721521129',
        verif_code:(this.code)}).map((res:Response) => res.json()).subscribe(
      (response) => this.onGetResult(response.json()),
      (error) => this.onGetError(error.json()),
      () => this.onGetComplete()
    );*/

    return this.articles;
  }

}
