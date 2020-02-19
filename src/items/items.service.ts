import { Injectable, HttpException } from '@nestjs/common';
import { Item } from './item.interface';

@Injectable()
export class ItemsService {
    findOne(id: number): Item | PromiseLike<Item> {
        if(id < 0 || id > this.items.length)
            throw new HttpException('Invalid item id', 400);

        return this.items[id];
    }
    private readonly items: Item[] = [];

    findAll(): Item[] {
        return this.items;
    }

    create(item: Item) {
        this.items.push(item);
    }
}
