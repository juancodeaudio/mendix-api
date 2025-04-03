import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from '../dtos/locations.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>
  ) {}

  findAll() {
    return this.locationRepo.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepo.findOne({
      where: { id },
      relations: ['machines'],
    });
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return location;
  }

  createLocation(data: CreateLocationDto) {
    const newLocation = this.locationRepo.create(data);
    return this.locationRepo.save(newLocation);
  }

  async updateLocation(id: number, changes: UpdateLocationDto) {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    this.locationRepo.merge(location, changes);
    return this.locationRepo.save(location);
  }

  async removeLocation(id: number) {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return this.locationRepo.delete(id);
  }
}
