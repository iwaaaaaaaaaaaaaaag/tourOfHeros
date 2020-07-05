<h1>{{title}}</h1>
tsファイルの変数をhtmlに持ってくる

src/style.scss
全体のスタイルを設定する

# コマンド
## コンポーネントを作成する
ng generate component xxxxx
→app.module.tsにHeroesComponentが格納される

## Serviceを作成する
ng generate service hero

## routeing
ng generate module app-routing --flat --module=app

## Pipe  
`<h2>{{hero.name | uppercase}} Details</h2>`
テンプレートでパイプを指定するとデータ書式を変更する事ができる   
コンポーネントの中でもパイプを指定できる   

`<li *ngFor="let hero of heroes$ | async" >`   
Observableが自動的にサブスクライブされる

# ディレクティブ
## 繰り返しディレクティブ
*ngFor="let hero of heroes"

## ngIfの使用方法
`<div *ngIf="selectedHero">`


# バインディング
## 双方向バインディング
`<input [(ngModel)]="hero.name" placeholder="name">`

## イベントバインディング
`<div (click)="onSelect(hero)">`

## クラスバインディング
`<div class="">`→scssクラス固定
`<div [class]="templateValue">`templateValueはテンプレートの変数
`<div [class.xxx]="booleanの変数 or booleanを返す関数">`xxxはクラス名　

## プロパティバインディング
`<app-hero-detail [hero]="selectedHero"></app-hero-detail>`  
selectedHeroはテンプレートの変数　selectedHeroの値がapp-hero-detailのheroに格納される

# デコレータ
## @input()
親から子へ値を引き渡す際に使用する。
```
parent.html
<child-selector value="hogehoge"></child-selector>
```
hogehogeが子に引き継がれる

## @injectable()
DIを可能にする  
呼び出す場合はconstructorの引数にする  
`constructor(private xxxService: xxxService) {}`

## ObservableとSubscribe
Observable型は値を非同期に返し続ける  
値を取得するためにはSubscribe関数を使用する

# モジュール
## routerモジュール
```
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent}
];
```
localhost:4200/heroesの場合、HeroesComponentを表示する  
空白に完全一致する場合は/dashboardに遷移する
```
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
```

# html
## router
`<router-outlet></router-outlet>`を指定するとrouting.appの中のpathを参照する  
`<a routerLink="/heroes">Heroes</a>`とするとパスを指定できる
## テンプレート参照変数
`<input #heroName />`
テンプレート参照変数は、コンポーネントのテンプレートのどこからでも参照することが可能。

# お作法
## 数値→文字列変換
```const id = +this.route.snapshot.paramMap.get('id');```
+を付けると数値→文字列に変換される


# tips
## ライブラリをインストールして上手くいかない場合
メジャーバージョンをダウングレードして`npm update`

## 
```
import { catchError, map, tap } from 'rxjs/operators';   
↓↓↓↓↓↓   
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
```   
catchErrorオペレータは失敗したObservableをインターセプトする

## ObservableとSubscribeのルール
returnしないObservableの場合も、Subscribeしなければならない。