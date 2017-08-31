import { Component, OnInit } from '@angular/core';
import { GetarticleService } from '../../service/getarticle/getarticle.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers:[GetarticleService]
})

export class ArticlesComponent implements OnInit {
  article;

  constructor(private GetarticleService:GetarticleService) { }

  ngOnInit() {
    console.log(this.GetarticleService.articles);
    this.article = this.GetarticleService.myData();
    console.log(this.article);
  }

  // getDataFromServer() {
  //   for(var i =0; i<1; i++){
  //     return "assets/football.jpg";
  //   }
  // }
  //
  // articles = [
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  //   { pic:this.getDataFromServer(),
  //     title:"Title name",
  //     distance:"less than 1km",
  //     time:"18.30-23.00",
  //     catagory:"Football"
  //   },
  // ];


  /*article_pic = this.getDataFromServer();
  article_title = "Title name";
  article_distance = "less than 1km";
  article_time = "18.30-23.00";
*/
}
