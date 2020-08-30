import { HttpParams } from '@angular/common/http';

export abstract class HttpParamsBuilder {

    private static params: HttpParams;

    public static init() : typeof HttpParamsBuilder {
        this.params = new HttpParams();
        return this;
    }

    public static set(key: string, value: any) : typeof HttpParamsBuilder {
        if (key && value) {
            this.params = this.params.append(key, value);
        }
        return this;
    }

    public static build() : HttpParams {
        return this.params;
    }

}