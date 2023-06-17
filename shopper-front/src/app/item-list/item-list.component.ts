import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];
  newItemName = '';
  newItemAmount = '';
  editingItem = false;
  editedItem: Item = {name: '', amount: 0};
  // counter: number;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.getAllItems();
    // this.getCounter();
  }

  getAllItems(): void {
    this.itemService.getAllItems().subscribe(items => this.items = items);
  }

  addItem(): void {
    const newItem: Item = {name: this.newItemName, amount: parseInt(this.newItemAmount)} as Item;
    if (newItem.amount > 0) {
      this.itemService.addItem(newItem).subscribe(item => {
        this.items.push(item);

      });
      this.newItemName = '';
      this.newItemAmount = '';
    }
  }

  editItem(item: Item): void {
    this.editingItem = true;
    this.editedItem = {...item};
  }

  saveItem(): void {
    const index = this.items.findIndex(item => item.id === this.editedItem.id);
    if (index !== -1 && this.editedItem.amount > 0) {
      this.items[index] = {...this.editedItem};
    }
    this.editingItem = false;
    this.editedItem = {name: '', amount: 0};
  }

  cancelEdit(): void {
    this.editingItem = false;
    this.editedItem = {name: '', amount: 0};
  }
  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id!).subscribe(() => {
      this.items = this.items.filter(i => i !== item);
    });
  }

  // getCounter(): void {
  //   this.itemService.getCounter().subscribe((counter: number) => console.log(counter));
  // }
  // getCounter(): void {
  //   this.itemService.getCounter()
  //     .subscribe(counter => this.counter = counter);
  // }

}
