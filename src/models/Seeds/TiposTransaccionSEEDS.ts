import {getDataSource} from "../../config/DBConfig";
import { tipoPersona } from '../tipoPersona';

export async function seedtipoPersona() {
    const appDataSource = await getDataSource();
    const tipoTransaccionesData = [
        { nombre: 'BANCO' },
        { nombre: 'CORRESPONSAL' },
        { nombre: 'EMPRESA' },
    ];

    const tipoPersonaRepository = appDataSource.getRepository(tipoPersona);
    const existingtipoPersona = await tipoPersonaRepository.find();

    const tipoTransaccionesToInsert = tipoTransaccionesData.filter(
        data => !existingtipoPersona.some(tipoPersona => tipoPersona.nombre === data.nombre)
    );

    if (tipoTransaccionesToInsert.length > 0) {
        const tipoPersona = tipoTransaccionesToInsert.map(data => tipoPersonaRepository.create(data));
        await tipoPersonaRepository.save(tipoPersona);
    }
}
