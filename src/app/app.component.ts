import { Component } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicModule, Platform } from '@ionic/angular';
import { DatabaseService } from './database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
  providers: [SQLite, DatabaseService]
})
export class AppComponent {
  constructor(platform: Platform, dbService: DatabaseService) {
    platform.ready().then(() => {
      dbService.createDatabase().then(() => console.log('Database Created!'))
      .catch((e: any) => {
        console.error(e);
      })
    })
  }
}
