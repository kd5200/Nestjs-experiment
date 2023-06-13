import { Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User)private readonly userRepository: Repository<User>) {
        super(User, userRepository.manager);
      }

    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = AuthCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({ username, password: hashedPassword });

        try {
        await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException
            }
            console.log(error.code);
        }
    }
}