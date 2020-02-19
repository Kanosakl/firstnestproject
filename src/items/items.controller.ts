import { Controller, Get, Post, Body, UsePipes, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.interface';
import { ValidationPipe } from "../common/validation.pipe";
import { CreateItemDto } from "./create-item.dto";
import { EasyconfigService } from 'nestjs-easyconfig';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService, private config: EasyconfigService) { }

    @Get('/:id')
    async findOne(@Param() params): Promise<Item> {
        return this.itemsService.findOne(params.id);
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }
}