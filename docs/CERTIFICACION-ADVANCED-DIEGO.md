# Certificación Solana Advanced — proyecto de Diego Arcos

## Qué construimos

Basado en el Registro de Ventas de WayLearn, este proyecto conserva el modelo de tres cuentas (Registro, Cliente, Venta) y las cinco instrucciones originales.

**Extensión de la clase 5:** `eliminar_cliente(id_cliente)`. Solo la wallet propietaria puede dar de baja un cliente; rechaza la operación si todavía tiene compras activas o referencias en su historial. Si está vacío, lo elimina del vector del Registro y Anchor cierra su cuenta devolviendo el depósito de renta a su propietario.

**Aporte propio distinto de la baja:** validar **montos mayores que cero dentro del programa Rust**, tanto al crear una venta como al modificar su monto. La interfaz ya rechazaba los ceros, pero un cliente externo podía enviar una instrucción con 0 al programa original. El nuevo control vive en la blockchain y utiliza el error `MontoInvalido`.

Los importes son enteros ficticios; este sistema **no recibe ni devuelve dinero real**.

## Código modificado

- `programa/src/lib.rs`: instrucción `eliminar_cliente`, contexto `EliminarCliente` y errores `MontoInvalido`, `ClienteConVentas`, `ClienteNoRegistrado`.
- `src/solana/acciones.ts`: construye la instrucción de baja con el discriminador de Anchor y el ID del cliente como `u16` little-endian. Es temporalmente manual porque el IDL de referencia anterior no incorpora la instrucción; al desplegar, se debe exportar **el IDL nuevo**.
- `src/components/Registro.tsx`: pestaña para dar de baja clientes y explicar la condición.
- `tests/integracion-cliente.test.ts`: comprueba discriminador, roles y presencia de reglas; no sustituye pruebas reales en Devnet.

## Pasos en GitHub Codespaces

1. Abrir la rama `certificacion-advanced-22nov` y pulsar **Code → Codespaces → Create codespace on certificacion-advanced-22nov**.
2. El contenedor debe preparar Node 22 y dependencias. Si hace falta, ejecutar `npm ci`.
3. Ejecutar `npm run verificar` y conservar la salida. **Esto no despliega el programa**, solo verifica TypeScript, tests y compilación web.
4. Iniciar la interfaz con `npm run dev` y abrir el puerto **5173** en una pestaña normal con extensión de wallet.

> **No ejecutar `npm run clase:resuelto` después de estos cambios**, porque sustituiría `src/solana/acciones.ts` y quitaría nuestra función `eliminarCliente`.

## Solana Playground: despliegue necesario

1. Abrir <https://beta.solpg.io/> y entrar con la cuenta de práctica. Seleccionar **Devnet**.
2. Importar el proyecto Rust de `programa/src/lib.rs` de **esta rama**, no el código de WayLearn sin modificar.
3. En Playground, revisar el `declare_id!("")` de la plantilla y configurar el **Program ID real** siguiendo las instrucciones de Playground. No inventar ni copiar el Program ID del IDL de referencia.
4. Compilar con Build. Corregir cualquier error **antes** de desplegar.
5. Desplegar en Devnet usando SOL de prueba. Copiar el **Program ID público**.
6. Exportar el **IDL generado por ese mismo build**. Confirmar que incluye `eliminarCliente`, `MontoInvalido` y `ClienteConVentas`.
7. En Codespaces, guardar temporalmente el IDL exportado, por ejemplo `tmp-idl/registro.json`, y ejecutar:

```bash
npm run configurar:idl -- ./tmp-idl/registro.json
npm run verificar
npm run dev
```

Si el IDL no incluye la dirección, usar `--program-id TU_PROGRAM_ID` en el comando de importación. Importar el IDL **regenera el cliente Codama** y desbloquea las operaciones del programa. Reiniciar Vite tras importar.

> Al regenerar Codama, no editar manualmente `clients/js/src/generated`; la función `eliminarCliente` local de `acciones.ts` sigue siendo válida si los datos y las cuentas del IDL generado coinciden con lo desplegado.

## Pruebas reales en Devnet

Usar solo datos ficticios y SOL de Devnet.

| Orden | Caso | Resultado esperado |
|---|---|---|
| 1 | Crear Registro `Viajes Demo Diego` | Cuenta creada |
| 2 | Crear cliente `Cliente Prueba` | Cliente #1 en listado |
| 3 | Registrar venta `VJ001`, monto 150 | Venta activa |
| 4 | Cambiar monto a 200 | Venta actualizada |
| 5 | Intentar dar de baja al cliente #1 | **Rechazo**: `ClienteConVentas` |
| 6 | Hacer devolución de `VJ001` | Venta cerrada, compras 0 |
| 7 | Dar de baja al cliente #1 | Cuenta cerrada y referencia retirada |
| 8 | Crear otro cliente y registrar venta con monto 0 desde Playground/cliente de prueba | **Rechazo on-chain**: `MontoInvalido` |
| 9 | Registrar monto 1 con el mismo cliente, luego intentar cambiarlo a 0 desde Playground | **Rechazo on-chain**: `MontoInvalido` |
| 10 | Intentar escribir con otra wallet | Rechazo por autoridad |

La interfaz rechaza montos 0 desde el formulario. **Para demostrar la mejora on-chain, hay que enviar la instrucción con 0 desde el cliente de Playground u otro cliente de prueba que no aplique esa validación**. Un error de preflight puede no generar firma de transacción; en ese caso guardar logs.

Registrar por prueba: fecha, caso, resultado esperado, observado, firma si existe, enlace de Solana Explorer Devnet y captura. Nunca subir llaves privadas, frase de recuperación ni archivos de wallet.

## Evidencias y entrega

Completar el README principal con tu Program ID, enlaces y pruebas verificadas. Subir el IDL real y cliente generado de la compilación usada. No usar el IDL de referencia como evidencia de despliegue.

- Proyecto: <https://github.com/arcosmedinadiegoarmando-collab/Registro-Ventas-Solana-App>
- Explorer: <https://explorer.solana.com/?cluster=devnet>
- Formulario Advanced: <https://airtable.com/appqcPkgPHDB6fyz7/pagtEQg4DjDOKDHIL/form>
- Fecha de corte recibida por correo: **22 de noviembre de 2026, 11:59 p. m. Ciudad de México**.

**Estado actual:** el código se preparó en GitHub, pero no se ha compilado en Solana Playground, no se ha desplegado ni se han registrado transacciones comprobadas. Ejecutar los pasos y sustituir este estado por evidencias reales antes de presentar.
