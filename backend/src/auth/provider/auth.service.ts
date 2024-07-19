import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDetailsDto } from '../dto/user.register.dto';
import { JwtService } from '@nestjs/jwt';
import COMPARE_HASH from 'src/utils/hashing/CompareHash';
import { ResetCredentials, ChangeCredentials } from '../dto/reset.dto';
import HASHED_STRING from 'src/utils/hashing/HashString';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //
  async reset(resetCred: ResetCredentials) {
    try {
      const userCredentials = await this.prisma.user.update({
        where: {
          email_address: resetCred.email,
        },
        data: { reset_code: resetCred.reset_code },
      });
      return userCredentials;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async change(resetCred: ChangeCredentials) {
    try {
      const userCredentials = await this.prisma.user.findFirstOrThrow({
        where: {
          reset_code: resetCred.reset_code,
        },
      });
      console.log(userCredentials);
      if (userCredentials.reset_code === null)
        throw new Error('Code_Not_Found');
      resetCred.reset_code = 'RESOLVED';
      const hashed = await HASHED_STRING.getHashStrng(resetCred.password);

      const isMismatch = await COMPARE_HASH.compareHash(
        resetCred.password,
        await hashed,
      );
      if (!isMismatch) {
        throw new Error('ERROR_DECRYPT_PASSWORD');
      }
      const updateCredentials = await this.prisma.user.update({
        where: { id: userCredentials.id },
        data: {
          password: hashed,
          reset_code: resetCred.reset_code,
        },
      });
      return updateCredentials;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  //Checking of user credentials
  async validateUser(authPayloadDto: AuthPayloadDto) {
    try {
      const userCredentials = await this.prisma.user.findFirstOrThrow({
        where: {
          email_address: authPayloadDto.username,
        },
      });

      const isMatch = await COMPARE_HASH.compareHash(
        authPayloadDto.password,
        userCredentials.password,
      );

      if (!isMatch) throw new Error('Invalid Password');
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
