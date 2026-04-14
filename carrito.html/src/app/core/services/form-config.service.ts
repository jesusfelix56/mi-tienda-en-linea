import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceFormConfig } from "../../shared/models/service-form-config.model";

@Injectable({
    providedIn: 'root',
})
export class FormConfigService {
    private readonly _serviceContractConfigUrl = '/api/public/mocks/v1/parameters/service-contract-form.json';

    constructor(private readonly _http: HttpClient) {}

    getServiceContractConfig(): Observable<ServiceFormConfig> {
        return this._http.get<ServiceFormConfig>(this._serviceContractConfigUrl);
    }
 }