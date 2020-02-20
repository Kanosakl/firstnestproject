export class CreateOrderDto {
    items: [{
        id: string,
        quantity: number,
    }];
}