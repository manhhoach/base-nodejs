import { NotFoundException } from '@nestjs/common';
import { BaseEntity, DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { getPagingData, getPagination } from './../../utils/paginate';

export abstract class BaseService<TEntity extends BaseEntity> {
  constructor(private readonly repository: Repository<TEntity>) {}

  create(entity: DeepPartial<TEntity>) {
    const data = this.repository.create(entity);
    return this.repository.save(data);
  }

  async paginate(page_index: number, page_size: number, condition?: any, order?: any) {
    const { skip, limit } = getPagination(page_size, page_index);
    const data = await this.repository.findAndCount({
      skip: skip,
      take: limit,
      where: condition,
      order: order ? order : { created_date: 'DESC' },
    });
    return getPagingData(data, page_index, limit);
  }

  findAll(condition?: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[], order?: FindOptionsOrder<TEntity>) {
    let orderDefault = { created_date: 'DESC' } as unknown as FindOptionsOrder<TEntity>;
    return this.repository.find({ where: condition ? condition : {}, order: order ? order : orderDefault });
  }

  async findById(id: number) {
    const data = await this.repository.findOneBy({
      id,
    } as unknown as FindOptionsWhere<TEntity>);
    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: number, entity: DeepPartial<TEntity>) {
    const data = await this.findById(id);
    return this.repository.save(Object.assign(data, entity));
  }

  async delete(condition: number | number[] | FindOptionsWhere<TEntity>) {
    await this.repository.delete(condition);
    return null;
  }
}
