import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SMSService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}

    sendVerificationSMS(args: { code: string; phoneNumber: string }) {
        const { code, phoneNumber } = args;
        const auth = {
            api_key: this.configService.get('MOBIZON_API_KEY'),
        };
        const send = this.httpService
            .post(
                `https://api.mobizon.kz/service/Message/SendSmsMessage?recipient=${phoneNumber}&text=%D0%A2%D0%9E%D0%9E%20%D0%93%D0%B5%D1%84%D0%B5%D1%81%D1%82%20your%20verification%20code%20${code}&api=v1&apiKey=${auth.api_key}`,
                {},
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Cache-control': 'no-cache'

                    }
                }
            )
            .subscribe();
        return send;
    }
}
