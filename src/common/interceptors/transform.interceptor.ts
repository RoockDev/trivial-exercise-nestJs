import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        let finalMessage = 'Operación realizada con éxito';
        let finalData = data;

        // 
        // Verificamos que 'data' sea un objeto y no un Array (porque los arrays no tienen propiedad message así)
        if (data && !Array.isArray(data) && typeof data === 'object' && 'message' in data) {
            
            
            
            const { message, ...resto } = data; 
            
            finalMessage = message; 
            finalData = resto;     
        }

      
        return {
          success: true,
          message: finalMessage,
          data: finalData
        };
      })
    );
  }
}