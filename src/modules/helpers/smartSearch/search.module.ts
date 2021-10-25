import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { smartSearchFactory } from './search.provider';

@Module({
    imports: [ConfigModule],
    providers: [smartSearchFactory],
    exports: [smartSearchFactory],
})
export class SmartSearchModule {}
