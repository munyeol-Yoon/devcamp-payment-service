import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserReqDto } from './dto/user.req.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async createUser(
    dto: UserReqDto,
    hashedPassword: string,
  ): Promise<UserModel> {
    const user = this.repository.create(dto);
    user.password = hashedPassword;
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.repository.findOneBy({ email });
  }
}
