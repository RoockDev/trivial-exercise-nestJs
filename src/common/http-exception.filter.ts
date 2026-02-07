import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

//Esto como te comenté lo hice con IA para poder devolver la misma estructura al igual que el interceptor
@Catch() 
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    //  Averiguamos el código de estado (400, 404, 500...)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //  Extraemos el mensaje de error original
    // A veces Nest devuelve un objeto con detalles, a veces un string.
    let message = 'Error interno del servidor';
    
    if (exception instanceof HttpException) {
        const errorResponse = exception.getResponse();
        // Si el error es un objeto (ej: validación), cogemos su mensaje. Si es string, lo usamos directo.
        if (typeof errorResponse === 'object' && errorResponse !== null && 'message' in errorResponse) {
             // A veces 'message' es un array (validaciones), lo unimos
             const msg = (errorResponse as any).message;
             message = Array.isArray(msg) ? msg.join(', ') : msg;
        } else if (typeof errorResponse === 'string') {
            message = errorResponse;
        }
    } else if (exception instanceof Error) {
        message = exception.message; 
    }

    
    response.status(status).json({
      success: false,      
      message: message,    
      data: null           
    });
  }
}