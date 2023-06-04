import {getDataSource} from "../../config/DBConfig";
import { TipoTransaccion } from '../tipoTransaccion';

export async function seedTipoTransaccion() {
    const appDataSource = await getDataSource();
    const tipoTransaccionesData = [
        { tipoTransaccion: 'BANCO' },
        { tipoTransaccion: 'CORRESPONSAL' },
        { tipoTransaccion: 'EMPRESA' },
    ];

    const tipoTransaccionRepository = appDataSource.getRepository(TipoTransaccion);
    const existingTipoTransacciones = await tipoTransaccionRepository.find();

    const tipoTransaccionesToInsert = tipoTransaccionesData.filter(
        data => !existingTipoTransacciones.some(tipoTransaccion => tipoTransaccion.tipoTransaccion === data.tipoTransaccion)
    );

    if (tipoTransaccionesToInsert.length > 0) {
        const tipoTransacciones = tipoTransaccionesToInsert.map(data => tipoTransaccionRepository.create(data));
        await tipoTransaccionRepository.save(tipoTransacciones);
    }
}
