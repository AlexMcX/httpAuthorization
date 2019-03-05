import { Component, OnInit } from '@angular/core';
import { SettingsBaseService } from 'src/app/services/settings/settings-base.service';

@Component({
  selector: 'app-settings-base',
  templateUrl: './settings-base.component.html',
  styleUrls: ['./settings-base.component.css']
})
export class SettingsBaseComponent implements OnInit {

  constructor(private settingsService: SettingsBaseService) { }

  params: object = null;
  changes: object = {};

  ngOnInit() {
    const prm = this.settingsService.getBaseData();

    if (prm) {
      prm.then (
        response => {
          this.params = response;
        }
      );
    }
  }

  keys(): Array<string> {
    return Object.keys(this.params);
  }

  save() {
    this.settingsService.saveBase(this.changes);

    this.changes = {};
  }

  private isChanges(): boolean {
    return Object.keys(this.changes).length === 0;
  }
}
