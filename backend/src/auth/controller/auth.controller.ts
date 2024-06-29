import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  HttpCode,
  Post,
  Version,
  Request,
} from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { UserDetailsDto } from '../dto/user.register.dto';
import { AuthService } from '../provider/auth.service';
import CUSTOM_RESPONSE from 'src/response/custom-response/CustomResponse';
import HASHED_STRING from 'src/utils/hashing/HashString';
import COMPARE_HASH from 'src/utils/hashing/CompareHash';
import { ICustomResponse } from 'src/response/custom-response/ICustomResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  async Login(
    @Request() authPayload: AuthPayloadDto,
  ): Promise<ICustomResponse> {
    try {
      console.log(authPayload.email);

      //Getting User credentails using email
      const response = await this.authService.validateUser(authPayload);

      //Check if response is null. If yes throw error.
      if (!response) throw new Error('No Data Found');

      //If Success SignIn
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      //If service returned this message: 'No user found'
      if (error.message === 'No user found')
        throw new HttpException(
          CUSTOM_RESPONSE.getCustomResponse(
            HttpStatus.NOT_FOUND,
            error.message,
            null,
          ),
          HttpStatus.NOT_FOUND,
        );
      //If User has Invalid Credentials
      if (error.message === 'Invalid Credentials')
        throw new HttpException(
          CUSTOM_RESPONSE.getCustomResponse(
            HttpStatus.BAD_REQUEST,
            error.message,
            null,
          ),
          HttpStatus.UNAUTHORIZED,
        );

      //Unpredicted Error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  async createUserDetails(@Body() register: UserDetailsDto) {
    try {
      const hashed = HASHED_STRING.getHashStrng(register.password);
      const isMismatch = await COMPARE_HASH.compareHash(
        register.password,
        await hashed,
      );
      console.log(isMismatch);
      register.password = await hashed;

      await this.authService.regiterUser(register);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.CREATED,
        'Successfully Registered User',
        null,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}