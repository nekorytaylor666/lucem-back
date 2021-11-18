import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import * as moment from 'moment';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        graphqlUploadExpress({
            maxFileSize: 100000000,
        }),
    );
    await app.listen(3000);
}
bootstrap();
