import { Controller, Post, Body } from '@nestjs/common';
import { AuthServiceModule } from './service.module';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class ControllerModule {
    constructor(private authService: AuthServiceModule) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto); 
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto); 
    }
}
