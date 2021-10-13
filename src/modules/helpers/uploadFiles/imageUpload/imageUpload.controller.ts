import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('media')
export class ImageUploadController {
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: join(process.cwd(), 'uploads') });
    }
}
