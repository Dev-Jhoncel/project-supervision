import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDetailsDto } from '../dto/user.register.dto';
import { JwtService } from '@nestjs/jwt';
import COMPARE_HASH from 'src/utils/hashing/CompareHash';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    console.log('iM Here at validateUser');
    try {
      const userCredentials = await this.prisma.user.findFirstOrThrow({
        where: {
          email_address: authPayloadDto.email,
        },
      });
      console.log(userCredentials);

      const isMatch = COMPARE_HASH.compareHash(
        authPayloadDto.password,
        userCredentials.password,
      );

      if (!isMatch) throw new Error('Invalid Credentails');
      const token = this.jwtService.sign(userCredentials);
      return token;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async regiterUser(userDetails: UserDetailsDto) {
    try {
      userDetails.created_at = new Date();
      userDetails.updated_at = new Date();

      return this.prisma.user.create({
        data: userDetails,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
