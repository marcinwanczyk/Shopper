package com.example.shopper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImplementation implements ItemService {

    private final ItemRepo itemRepo;

    public ItemServiceImplementation(ItemRepo itemRepo) {
        this.itemRepo = itemRepo;
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }

    @Override
    public Optional<Item> getItemByID(Long id) {
        return itemRepo.findById(id);
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepo.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepo.deleteById(id);
    }
}
