import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

const uri =
  'mongodb+srv://ivan:12345@cluster0.thvugus.mongodb.net/realtor?retryWrites=true&w=majority&appName=Cluster0';

@Module({
  imports: [MongooseModule.forRoot(uri), HomeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
