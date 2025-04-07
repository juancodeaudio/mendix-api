import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class DatabaseExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // PostgreSQL: Foreign key violation
        if (error?.code === '23503') {
          return throwError(() =>
            new ConflictException('No se puede eliminar o modificar el registro porque está vinculado a otros datos.'),
          );
        }

        // PostgreSQL: Unique violation
        if (error?.code === '23505') {
          return throwError(() =>
            new ConflictException('Ya existe un registro con estos datos.'),
          );
        }

        // Otros errores no manejados específicamente
        return throwError(() =>
          new InternalServerErrorException('Error inesperado en la base de datos.'),
        );
      }),
    );
  }
}
