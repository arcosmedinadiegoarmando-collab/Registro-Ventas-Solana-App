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
- [x] Cliente Codama regenerado en Codespaces y subido a GitHub mediante commit y push (captura del 22/11/2026).
- [x] `npm run verificar` aprobado en Codespaces después de importar el IDL (captura del 22/11/2026).
- [x] Aplicación abierta en Codespaces, puerto 5173 (captura del 22/11/2026).
- [x] Wallet Phantom conectada a la aplicación Devnet; **Phantom bloqueó la solicitud de firma del dominio temporal**, por lo que las pruebas de escritura se realizaron con wallet de Playground.
- [x] Pruebas reales de negocio, validación de montos y rechazo de autoridad comprobadas en Playground (capturas del 22/11/2026). Pendiente subir capturas y enlazar firmas exactas en Explorer.
- [x] Cliente Codama regenerado, IDL, configuración y código subidos a GitHub en la rama `certificacion-advanced-22nov`.
- [x] Lectura del registro real comprobada en el frontend: negocio `Viajes Demo Diego`, cliente #2 y venta `VAL01` por 150 unidades.
- [ ] Subir las capturas y completar enlaces de transacciones en Explorer en el propio repositorio.
- [ ] Formulario de certificación enviado y confirmación guardada.

## Alta adicional para las pruebas de validación

El 22/11/2026 se creó en Solana Playground **Cliente Validacion**, con **ID 2** en el registro `Viajes Demo Diego`. La terminal mostró `CLIENTE CREADO CORRECTAMENTE` y su firma; captura compartida en la conversación. Este cliente se utilizó para intentar registrar una venta de monto cero. El contrato Rust rechazó la operación con `MontoInvalido` (6002), como consta en la tabla de resultados.

### Venta válida adicional para verificar el cambio de monto

El 22 de noviembre de 2026 se registró correctamente la venta `VAL01` (150 unidades) para el cliente `Cliente Validacion` (ID 2) desde Solana Playground en Devnet. La captura muestra `VENTA VALIDA REGISTRADA` y una firma de transacción. Esta cuenta se utilizó para probar `cambiar_monto(..., 0)`. El contrato rechazó el cambio con `MontoInvalido` (6002) y el valor permaneció en 150 unidades.

## Lectura desde el frontend verificada

El 22 de noviembre de 2026 se comprobó en la página de React servida por GitHub Codespaces (puerto 5173) que la consulta de registro en **Devnet** muestra `Viajes Demo Diego` para la dirección pública de autoridad de Playground, el cliente **Cliente Validacion** (ID 2) y la venta `VAL01` con monto **150 unidades**. La captura fue aportada durante la sesión.

La wallet Phantom del navegador permanecía conectada a otra dirección y por eso la aplicación mostraba *modo lectura de otra autoridad*; esto es correcto. **No se probó que Phantom firmara transacciones desde la URL de Codespaces:** la extensión bloqueó las solicitudes; las escrituras y validaciones de contrato se probaron en Solana Playground.

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
| Baja de cliente sin ventas | Cuenta cerrada, sin referencia | **Aprobada**: Cliente Prueba ID 1 cerrado, consulta posterior `finalized` muestra cuenta cerrada y `sigueListado=false` (captura 22/11/2026) | Firma visible en la terminal de Playground; enlace Explorer pendiente | Captura proporcionada en conversación |
| Intentar venta por 0 desde cliente de prueba | Rechazo `MontoInvalido` en Rust | **Aprobada:** Cliente Validacion ID 2; SKU `VAL00`, monto 0 rechazado por programa Rust, `MontoInvalido` código **6002** y cuenta de venta **no creada** (captura 22/11/2026). | Error Anchor registrado en logs de Playground; no se generó firma de operación exitosa | Captura proporcionada en conversación |
| Intentar cambiar monto a 0 desde cliente de prueba | Rechazo `MontoInvalido` en Rust | **Aprobada:** `VAL01` del cliente 2 se mantuvo en 150 tras intentar cambiar a 0; Anchor rechazó con **MontoInvalido (6002)**, confirmado con lectura posterior (captura 22/11/2026) | Logs de Playground: transacción rechazada durante la simulación, sin firma de éxito | Captura proporcionada en conversación |
| Firmar con dueño incorrecto | Rechazo de autoridad | **Aprobada:** cambio de monto `VAL01` (150 → 151) con wallet ajena rechazado; Anchor `NoOwner` código **6000** y monto final 150 (captura del 22/11/2026). | Logs de Playground; la simulación rechazada no generó transacción de éxito | Captura proporcionada en conversación |

**Aclaración:** la interfaz valida importes positivos antes de enviar la transacción. La prueba de la validación **on-chain** debe realizarse con un cliente que envíe monto cero, como Solana Playground. Para fallas de simulación pueden existir logs sin una firma confirmada.

## Archivos o capturas que debes guardar

Puedes crear una carpeta `evidencias/` en el repositorio para subir capturas sin información privada: desplegado.png, registro.png, cliente.png, venta.png, correccion.png, devolucion.png, baja-rechazada.png, baja-exitosa.png y monto-cero-rechazado.png. Usa nombres reales según las pruebas realizadas.

**Nunca subas claves privadas, archivo de wallet, frases de recuperación ni datos personales reales.**

## Referencias

- [Guía del proyecto](./CERTIFICACION-ADVANCED-DIEGO.md)
- [Manual de pruebas de WayLearn](./PRUEBAS-MANUALES.md)
- [Explorer Devnet](https://explorer.solana.com/?cluster=devnet)
- [Formulario de entrega Advanced](https://airtable.com/appqcPkgPHDB6fyz7/pagtEQg4DjDOKDHIL/form)

**Estado:** las pruebas de negocio y seguridad indicadas como aprobadas se ejecutaron durante la sesión y aparecen en capturas compartidas en el chat. Queda pendiente subir las imágenes al repositorio y completar los enlaces de Explorer; una captura del frontend confirma la consulta de datos de Devnet. Las operaciones rechazadas durante simulación no producen necesariamente una firma de transacción exitosa.

## Nota de la primera prueba real

El 22/11/2026, desde **Solana Playground** y la wallet del entorno, la terminal mostró `Registro creado correctamente` junto con la firma de la transacción. La captura evidencia éxito del método RPC. **Pendiente:** copiar la firma exacta desde Playground, verificarla en Explorer Devnet y agregar el enlace en esta tabla. No confundir esta operación con los intentos que Phantom bloqueó desde el dominio temporal de Codespaces.
