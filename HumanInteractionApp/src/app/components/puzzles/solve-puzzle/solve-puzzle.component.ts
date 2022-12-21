import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-solve-puzzle',
  templateUrl: './solve-puzzle.component.html',
  styleUrls: ['./solve-puzzle.component.scss'],
})
export class SolvePuzzleComponent implements OnInit {
  private rows: number = 5;
  private columns = 5;

  private currTile: any;
  private otherTile: any;

  private turns = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        //<img>
        let tile = document.createElement('img');
        tile.src = '../../../../assets/images/images/blank.jpg';

        //DRAG FUNCTIONALITY
        tile.addEventListener('dragstart', this.dragStart); //click on image to drag
        tile.addEventListener('dragover', this.dragOver); //drag an image
        tile.addEventListener('dragenter', this.dragEnter); //dragging an image into another one
        tile.addEventListener('dragleave', this.dragLeave); //dragging an image away from another one
        tile.addEventListener('drop', this.dragDrop); //drop an image onto another one
        tile.addEventListener('dragend', this.dragEnd); //after you completed dragDrop

        this.document.getElementById('board')!.append(tile);
      }
    }

    //pieces
    let pieces = [];
    for (let i = 1; i <= this.rows * this.columns; i++) {
      pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
      let j = Math.floor(Math.random() * pieces.length);

      //swap
      let tmp: any = pieces[i];
      pieces[i] = pieces[j];
      pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
      let tile = document.createElement('img');
      tile.src = '../../../../assets/images/images/' + pieces[i] + '.jpg';

      //DRAG FUNCTIONALITY
      tile.addEventListener('dragstart', this.dragStart); //click on image to drag
      tile.addEventListener('dragover', this.dragOver); //drag an image
      tile.addEventListener('dragenter', this.dragEnter); //dragging an image into another one
      tile.addEventListener('dragleave', this.dragLeave); //dragging an image away from another one
      tile.addEventListener('drop', this.dragDrop); //drop an image onto another one
      tile.addEventListener('dragend', this.dragEnd); //after you completed dragDrop

      document.getElementById('pieces')!.append(tile);
    }
  }

  dragStart() {
    this.currTile = this; //this refers to image that was clicked on for dragging
  }

  dragOver(e: any) {
    e.preventDefault();
  }

  dragEnter(e: any) {
    e.preventDefault();
  }

  dragLeave() {}

  dragDrop() {
    this.otherTile = this; //this refers to image that is being dropped on
  }

  dragEnd() {
    if (this.currTile.src.includes('blank')) {
      return;
    }
    let currImg = this.currTile.src;
    let otherImg = this.otherTile.src;
    this.currTile.src = otherImg;
    this.otherTile.src = currImg;

    this.turns += 1;
    document.getElementById('turns')!.innerText = '' + this.turns;
  }
}
