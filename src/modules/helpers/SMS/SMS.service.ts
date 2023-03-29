import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SMSService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}

    async sendVerificationSMS(args: { code: string; phoneNumber: string }) {
        const { code, phoneNumber } = args;
        const api_key = this.configService.get('MOBIZON_API_KEY');
        const send = await this.httpService
            .post(
                `https://api.mobizon.kz/service/Message/SendSmsMessage?recipient=${phoneNumber}&text=%D0%A2%D0%9E%D0%9E%20%D0%93%D0%B5%D1%84%D0%B5%D1%81%D1%82%20your%20verification%20code%20${code}&api=v1&apiKey=${api_key}&from=LucemClinic`,
                {},
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Cache-control': 'no-cache',
                    },
                },
            )
            .toPromise();
        console.log(send.data);
        // const sendResponce = await lastValueFrom(send);
        return send.data;
    }
}
