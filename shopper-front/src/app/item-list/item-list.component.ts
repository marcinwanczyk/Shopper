import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';

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
  counter = 0;
  searchQuery: string = '';

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.getAllItems();
    this.getCounter();
  }

  getAllItems(): void {
    this.itemService.getAllItems().subscribe(items => this.items = items);
  }

  sortItems(): void {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  addItem(): void {
    const newItem: Item = {name: this.newItemName, amount: parseInt(this.newItemAmount)} as Item;
    if (newItem.amount > 0 && newItem.name) {
      this.itemService.addItem(newItem).subscribe(item => {
        this.items.push(item);
        this.getCounter();
        this.itemService.saveCounter();

      });
      this.newItemName = '';
      this.newItemAmount = '';
    }
  }

  editItem(item: Item): void {
    this.editingItem = true;
    this.editedItem = {...item};
    this.getCounter();
  }

  saveItem(): void {
    const index = this.items.findIndex(item => item.id === this.editedItem.id);
    if (index !== -1 && this.editedItem.amount > 0) {
      this.items[index] = {...this.editedItem};
      this.getCounter();
      this.itemService.saveCounter();

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
      this.getCounter();
      this.itemService.saveCounter();

    });
  }

  getCounter(): void {
    this.itemService.getCounter().subscribe(counter => this.counter = counter);
  }

  searchItems(): void {
    if (this.searchQuery) {
      this.items = this.items.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.getAllItems();
    }
  }
}
