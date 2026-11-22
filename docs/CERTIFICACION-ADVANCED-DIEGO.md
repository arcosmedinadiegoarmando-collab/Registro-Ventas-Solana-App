# Certificación Solana Advanced — proyecto de Diego Arcos

## Qué construimos

Basado en el Registro de Ventas de WayLearn, este proyecto conserva el modelo de tres cuentas (Registro, Cliente, Venta) y las cinco instrucciones originales.

**Extensión de la clase 5:** `eliminar_cliente(id_cliente)`. Solo la wallet propietaria puede dar de baja un cliente; rechaza la operación si todavía tiene compras activas o referencias en su historial. Si está vacío, lo elimina del vector del Registro y Anchor cierra su cuenta devolviendo el depósito de renta a su propietario.

**Aporte propio distinto de la baja:** validar **montos mayores que cero dentro del programa Rust**, tanto al crear una venta como al modificar su monto. La interfaz ya rechazaba los ceros, pero un cliente externo podía enviar una instrucción con 0 al programa original. El nuevo control vive en la blockchain y utiliza el error `MontoInvalido`.

Los importes son enteros ficticios; este sistema **no recibe ni devuelve dinero real**.

## Código modificado

- `programa/src/lib.rs`: instrucción `eliminar_cliente`, contexto `EliminarCliente` y errores `MontoInvalido`, `ClienteConVentas`, `ClienteNoRegistrado`.
- `src/solana/instrucciones-eliminar.ts`: construye la instrucción de baja con el discriminador de Anchor y el ID del cliente como `u16` little-endian, independiente de Vite para ejecutar sus pruebas en Node.
- `src/solana/acciones.ts`: conecta esa instrucción con la wallet y el envío de transacciones. La construcción manual es temporal porque el IDL de referencia anterior no incorpora esta operación; al desplegar, se debe exportar **el IDL nuevo**.
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
3. El programa ya fue desplegado en Devnet con Program ID `H5MRzA9kNFVDL7Fwdmaf5iHyXauhZBYgTqisHufYWuTe`. Este identificador público está fijado en `programa/src/lib.rs`; conservarlo al reproducir la compilación.
4. Compilación y despliegue realizados en Solana Playground el 22 de noviembre de 2026 (captura en conversación). Las pruebas funcionales todavía no se han comprobado.
5. El IDL que exportaste ya se incorporó a `idl.json` con el identificador público del programa.
6. En el Codespace existente, sobre la rama `certificacion-advanced-22nov`, ejecutar:

```bash
git pull --ff-only
npm run configurar:idl -- ./idl.json
npm run verificar
npm run dev
```

El IDL del repositorio ahora incluye `metadata.address`, así que no hace falta pasar `--program-id`. Importar el IDL **regenera el cliente Codama** y desbloquea las operaciones del programa. Reiniciar Vite tras importar. En la pestaña **Puertos**, abrir el 5173 en el navegador con una wallet Solana compatible configurada en Devnet.

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

**Estado actual (22/11/2026):** el código TypeScript pasó verificación y build en Codespaces; el Rust se compiló y desplegó en Playground Devnet. El IDL se incorporó a GitHub, pero **aún es necesario regenerar el cliente en Codespaces, volver a verificar, probar transacciones y registrar evidencias**. No afirmar que estas pruebas ya pasaron.
