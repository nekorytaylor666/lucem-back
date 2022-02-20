import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { dateStyling } from './utils/dateStyling';

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
