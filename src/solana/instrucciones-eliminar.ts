import { AccountRole, type Address } from '@solana/kit';
import { REGISTRO_PROGRAM_ADDRESS } from '../../clients/js/src/generated';
import { idValido } from './validaciones';

/**
 * Construye la instruccion Anchor eliminar_cliente(id_cliente: u16).
 * Modulo independiente de Vite y del RPC para poder probar la
 * serializacion en Node.js sin inicializar la aplicacion web.
 *
 * Discriminador: primeros 8 bytes de sha256("global:eliminar_cliente").
 * El ID del cliente se serializa como u16 little-endian.
 */
export function instruccionEliminarCliente(
  owner: Address,
  registro: Address,
  cliente: Address,
  idCliente: number,
) {
  const id = idValido(idCliente);
  const data = new Uint8Array([
    205, 132, 251, 133, 247, 51, 204, 55,
    id & 255, id >> 8,
  ]);

  return {
    programAddress: REGISTRO_PROGRAM_ADDRESS,
    accounts: [
      { address: owner, role: AccountRole.WRITABLE_SIGNER },
      { address: registro, role: AccountRole.WRITABLE },
      { address: cliente, role: AccountRole.WRITABLE },
    ],
    data,
  };
}
