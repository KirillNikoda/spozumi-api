import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from 'src/services/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  public async getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.getOrder(id);
  }

  @Get()
  public async getOrders() {
    return this.getOrders();
  }
}
