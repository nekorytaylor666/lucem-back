import { Mutation, Resolver } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const xlsx = require('xlsx');
import * as excel from 'exceljs';
import { join } from 'path';
import { ScriptService } from '../service/script.service';

@Resolver()
export class ScriptResolver {
    constructor(private scriptService: ScriptService) {}

    // @Mutation(() => String)
    // async doctorScript() {
    //     const pathToDoctorSheets = join(process.cwd(), 'lucemData.xlsx');
    //     const doctorWorkbook = new excel.Workbook();
    //     const doctorWorkSheets = await doctorWorkbook.xlsx.readFile(
    //         pathToDoctorSheets,
    //     );
    //     const doctorWorkSheet = doctorWorkSheets.getWorksheet('Данные врачей');
    //     await this.scriptService.addDoctorsToDatabase(doctorWorkSheet);
    //     return 'string';
    // }

    // @Mutation(() => String)
    // async serviceScript() {
    //     const pathToServiceSheets = join(process.cwd(), 'lucemData.xlsx');
    //     const workbook = new excel.Workbook();
    //     const workSheets = await workbook.xlsx.readFile(pathToServiceSheets);
    //     const serviceWorkSheet = workSheets.getWorksheet('Список услуг');
    //     await this.scriptService.addServicesToDatabase(serviceWorkSheet);
    //     return 'string';
    // }
}
