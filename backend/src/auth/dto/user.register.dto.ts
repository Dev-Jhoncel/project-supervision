import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDetailsDto {
  id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  middle_name: string;

  @IsString()
  suffix: string;

  @IsString()
  @IsEmail(
    {},
    {
      message: 'Invalid Email address',
    },
  )
  email_address: string;

  @IsString()
  @MinLength(11)
  @MaxLength(12)
  @Matches(/^[0-9]/, { message: 'Invalid Mobile Number' })
  mobile_no: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
