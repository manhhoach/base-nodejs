import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  redis: Redis;
  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis(this.configService.get<string>('REDIS_URL'));
  }
  hset(key: string, field: string, value: number) {
    return this.redis.hset(key, field, value);
  }
  hgetAll(key: string) {
    return this.redis.hgetall(key);
  }
  hincrby(key: string, field: string, value: number) {
    return this.redis.hincrby(key, field, value);
  }
  del(key: string) {
    return this.redis.del(key);
  }

  get(key: string) {
    return this.redis.get(key);
  }
  incr(key: string) {
    return this.redis.incr(key);
  }
  setKeyUniqueWithExpiredTime(key: string, value: string, time: number) {
    return this.redis.set(key, value, 'EX', time, 'NX');
  }
  setKeyWithExpiredTime(key: string, value: any, time: number) {
    return this.redis.set(key, value, 'EX', time);
  }
  rightPop(key: string) {
    return this.redis.rpop(key);
  }
  leftPush(key: string, data: string) {
    return this.redis.lpush(key, data);
  }
  lrange(key: string): Promise<string[]> {
    return this.redis.lrange(key, 0, -1);
  }
  remove(key: string, data: string) {
    return this.redis.lrem(key, 1, data);
  }
  length(key: string) {
    return this.redis.llen(key);
  }
  setExpires(key: string, value: number) {
    return this.redis.expire(key, value);
  }
}
