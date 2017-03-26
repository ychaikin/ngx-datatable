import { Component } from '@angular/core';

@Component({
  selector: 'inline-edit-demo',
  template: `
    <div>
      <h3>
        Inline Editing
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/inline.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows">
        <ngx-datatable-column name="Name">
          <ng-template ngx-datatable-cell-template let-value="value" let-row="row" let-meta="meta">
            <span
              title="Double click to edit"
              (dblclick)="editing[meta.rowIndex + '-name'] = true"
              *ngIf="!editing[meta.rowIndex + '-name']">
              {{value}}
            </span>
            <input
              autofocus
              (blur)="updateValue($event, 'name', value, row, meta.rowIndex)"
              *ngIf="editing[meta.rowIndex + '-name']"
              type="text"
              [value]="value"
            />
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender">
          <ng-template ngx-datatable-cell-template let-row="row" let-value="value" let-meta="meta">
             <span
              title="Double click to edit"
              (dblclick)="editing[meta.rowIndex + '-gender'] = true"
              *ngIf="!editing[meta.rowIndex + '-gender']">
              {{value}}
            </span>
            <select
              *ngIf="editing[meta.rowIndex + '-gender']"
              (change)="updateValue($event, 'gender', value, row, meta.rowIndex)"
              [value]="value">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <ng-template ngx-datatable-cell-template let-value="value">
            {{value}}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class InlineEditComponent {

  editing = {};
  rows = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateValue(event, cell, cellValue, row, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
  }

}
