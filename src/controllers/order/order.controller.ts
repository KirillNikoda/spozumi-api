import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/createOrder.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { OrderService } from 'src/services/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrder(id);
  }

  @Get()
  @UseGuards(AdminGuard)
  public async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
}
