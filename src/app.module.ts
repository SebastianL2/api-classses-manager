import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'classesdb',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
