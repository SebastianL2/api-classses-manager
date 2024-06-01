import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';


export class UpdateClasstDto extends PartialType(CreateClassDto) {}