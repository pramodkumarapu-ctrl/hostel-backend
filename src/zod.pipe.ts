import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as zod from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: zod.ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }
    return result.data;
  }
}
