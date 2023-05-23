import moment from 'moment';
import 'moment-timezone';

export function obtenerFechaHora(): string {
    return moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
}