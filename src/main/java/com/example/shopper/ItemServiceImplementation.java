package com.example.shopper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImplementation implements ItemService {

    private final ItemRepo itemRepo;
    private int counter = 0;
    public ItemServiceImplementation(ItemRepo itemRepo) {
        this.itemRepo = itemRepo;
    }

    @Override
    public List<Item> getAllItems() {
        counter++;
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

    public String getCounter() {
        return "Number of requests: " + counter;
    }
}
