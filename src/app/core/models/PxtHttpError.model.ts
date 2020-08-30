import { HttpErrorResponse } from '@angular/common/http';

export class PxtHttpError extends HttpErrorResponse {
    /* error: HttpError;
    status: number; */
    error: string;
    message: string;
    path: string;
    status: number;
    timestamp: string;
}