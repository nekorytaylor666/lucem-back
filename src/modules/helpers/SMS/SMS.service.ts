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
        console.log(api_key);
        const send = await this.httpService
            .post(
                `https://api.mobizon.kz/service/Message/SendSmsMessage?recipient=${phoneNumber}&text=lucem%3a%20%d0%b2%d0%b0%d1%88%20%d0%ba%d0%be%d0%b4%20-%20${code}&api=v1&apiKey=${api_key}&from=Lucem`,
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
