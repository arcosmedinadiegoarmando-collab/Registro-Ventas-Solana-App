# Registro de evidencias — Solana Engineering Track Advanced

**Participante:** Diego Arcos  
**Proyecto:** Registro de Ventas Solana con baja de clientes y control on-chain de montos  
**Red:** Devnet  
**Program ID:** `H5MRzA9kNFVDL7Fwdmaf5iHyXauhZBYgTqisHufYWuTe`  
**Programa en Explorer:** https://explorer.solana.com/address/H5MRzA9kNFVDL7Fwdmaf5iHyXauhZBYgTqisHufYWuTe?cluster=devnet

## Estado de la implementación

- [x] Rust compilado en Solana Playground (captura del 22/11/2026).
- [x] Programa desplegado en Devnet (captura del 22/11/2026).
- [x] IDL exportado e integrado al repositorio, con 6 instrucciones.
- [ ] Cliente Codama regenerado a partir del IDL desplegado.
- [ ] `npm run verificar` aprobado después de importar el IDL.
- [ ] Aplicación abierta en Codespaces, puerto 5173.
- [ ] Wallet de navegador conectada a Devnet.
- [ ] Pruebas reales con transacciones y capturas (en proceso: creación de registro verificada en Playground).
- [ ] Repositorio actualizado con pruebas y documentación final.
- [ ] Formulario de certificación enviado y confirmación guardada.

## Pruebas funcionales

Usar datos ficticios, sin nombres ni información real de clientes.

| Caso | Resultado esperado | Resultado observado | Firma / logs | Evidencia |
|---|---|---|---|---|
| Crear registro `Viajes Demo Diego` | Se crea registro | **Creado correctamente** en Solana Playground (captura 22/11/2026) | Firma mostrada por Playground; pendiente copiar enlace exacto de Explorer | Captura proporcionada en conversación |
| Crear cliente #1 | Se agrega al registro | **Cliente Prueba**, ID 1, creado correctamente en Solana Playground (captura del 22/11/2026) | Firma mostrada en Playground; enlace exacto pendiente de registrar | Captura proporcionada en conversación |
| Registrar SKU `VJ001`, monto 150 | Se crea venta | **Venta creada correctamente** para el cliente #1 en Playground (captura 22/11/2026) | Firma mostrada en Playground; enlace a Explorer pendiente | Captura proporcionada en conversación |
| Cambiar monto a 200 | Se actualiza la misma venta | **Confirmado en Playground:** importe anterior 150, nuevo 200, SKU VJ001, cliente #1 (captura 22/11/2026) | Firma mostrada en la terminal de Playground; enlace de Explorer pendiente | Captura de conversación |
| Baja de cliente con venta activa | Rechazo `ClienteConVentas` | **Aprobada**: Cliente Prueba, ID 1, 1 venta activa, 1 historial; rechazo con error Anchor **6003** en Playground (22/11/2026) | Logs de ejecución; la transacción rechazada puede no producir firma | Captura de conversación |
| Devolver `VJ001` | Venta cerrada, compras 0 | **Aprobada:** lectura `finalized` muestra compras 0, historial vacío y cuenta VJ001 cerrada; captura Playground del 22/11/2026 | Firma de devolución visible en la sesión; pendiente enlazar Explorer | Captura proporcionada en conversación |
| Baja de cliente sin ventas | Cuenta cerrada, sin referencia | Pendiente | — | — |
| Intentar venta por 0 desde cliente de prueba | Rechazo `MontoInvalido` en Rust | Pendiente | — | — |
| Intentar cambiar monto a 0 desde cliente de prueba | Rechazo `MontoInvalido` en Rust | Pendiente | — | — |
| Firmar con dueño incorrecto | Rechazo de autoridad | Pendiente | — | — |

**Aclaración:** la interfaz valida importes positivos antes de enviar la transacción. La prueba de la validación **on-chain** debe realizarse con un cliente que envíe monto cero, como Solana Playground. Para fallas de simulación pueden existir logs sin una firma confirmada.

## Archivos o capturas que debes guardar

Puedes crear una carpeta `evidencias/` en el repositorio para subir capturas sin información privada: desplegado.png, registro.png, cliente.png, venta.png, correccion.png, devolucion.png, baja-rechazada.png, baja-exitosa.png y monto-cero-rechazado.png. Usa nombres reales según las pruebas realizadas.

**Nunca subas claves privadas, archivo de wallet, frases de recuperación ni datos personales reales.**

## Referencias

- [Guía del proyecto](./CERTIFICACION-ADVANCED-DIEGO.md)
- [Manual de pruebas de WayLearn](./PRUEBAS-MANUALES.md)
- [Explorer Devnet](https://explorer.solana.com/?cluster=devnet)
- [Formulario de entrega Advanced](https://airtable.com/appqcPkgPHDB6fyz7/pagtEQg4DjDOKDHIL/form)

**Estado:** este archivo es una plantilla. Ninguna fila en «Pruebas funcionales» acredita una transacción hasta registrar el resultado observado y evidencia correspondiente.

## Nota de la primera prueba real

El 22/11/2026, desde **Solana Playground** y la wallet del entorno, la terminal mostró `Registro creado correctamente` junto con la firma de la transacción. La captura evidencia éxito del método RPC. **Pendiente:** copiar la firma exacta desde Playground, verificarla en Explorer Devnet y agregar el enlace en esta tabla. No confundir esta operación con los intentos que Phantom bloqueó desde el dominio temporal de Codespaces.
