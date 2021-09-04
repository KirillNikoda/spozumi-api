import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  public async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'products']
    });
  }

  public async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id, {
      relations: ['user', 'products']
    });

    if (!order) {
      throw new NotFoundException('Order with that id was not found');
    }

    return order;
  }
}
