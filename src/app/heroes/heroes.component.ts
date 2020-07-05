import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',//コンポーネントのCSS要素セレクター app.module.tsのhtmlで指定する
  templateUrl: './heroes.component.html',//コンポーネントのテンプレートファイルの場所
  styleUrls: ['./heroes.component.scss']//コンポーネントのプライベートCSSスタイルの場所
})
export class HeroesComponent implements OnInit {

  hero: Hero = { 
    id:1,
    name: 'windstorm'
  }
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getHeros();
  }


  getHeros(): void {
    this.heroService.getHeroes()
    .subscribe(
      (heroes) => this.heroes = heroes
    );
  }

  add(name: string): void{
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
