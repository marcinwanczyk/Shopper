import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ItemListComponent} from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item to the list', () => {
    const initialItemCount = component.items.length;
    const newItemName = 'orzechy';
    const newItemAmount = '5';

    component.newItemName = newItemName;
    component.newItemAmount = newItemAmount;
    component.addItem();

    expect(component.items.length).toBe(initialItemCount + 1);
    expect(component.items[initialItemCount].name).toBe(newItemName);
    expect(component.items[initialItemCount].amount).toBe(parseInt(newItemAmount));
  });

  it('should not add an item with an invalid name or amount', () => {
    const initialItemCount = component.items.length;
    const invalidItemName = '';
    const invalidItemAmount = '-5';

    component.newItemName = invalidItemName;
    component.newItemAmount = invalidItemAmount;
    component.addItem();

    expect(component.items.length).toBe(initialItemCount);
  });

  it('should edit an existing item in the list', () => {
    const initialItemCount = component.items.length;
    const existingItemIndex = 0;
    const updatedItemName = 'Updated Item';
    const updatedItemAmount = '10';

    component.items = [
      {name: 'cebula', amount: 5},
      {name: 'ziemniak', amount: 10},
      {name: 'marchewka', amount: 15}
    ]

    component.editItem({name: updatedItemName, amount: parseInt(updatedItemAmount)});
    expect(component.items.length).toBe(initialItemCount);
    expect(component.items[existingItemIndex].name).toBe(updatedItemName);
    expect(component.items[existingItemIndex].amount).toBe(parseInt(updatedItemAmount));
  });
});
