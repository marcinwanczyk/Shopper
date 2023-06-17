package com.example.shopper;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    List<Item> getAllItems();

    Optional<Item> getItemByID(Long id);

    Item saveItem(Item item);

    void deleteItem(Long id);

    String getCounter();
}
