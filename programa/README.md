# Programa Solana de certificación — Diego Arcos

Este programa está basado en el Registro de Ventas con PDAs de WayLearn y fue extendido para el proyecto Advanced.

- `src/lib.rs`: seis instrucciones (incluida `eliminar_cliente`) y validaciones on-chain de montos positivos.
- `client/client.ts`: cliente de referencia del bootcamp para Solana Playground; no incluye automáticamente la sexta instrucción.
- **Program ID Devnet:** `H5MRzA9kNFVDL7Fwdmaf5iHyXauhZBYgTqisHufYWuTe`.

Esta carpeta no es un workspace Anchor CLI completo. El programa se compiló y desplegó en Solana Playground el 22 de noviembre de 2026, según la captura proporcionada durante la sesión. El IDL exportado se guardó en la raíz del repositorio (`idl.json`) con el Program ID incorporado.

Para conectar el frontend, usar en Codespaces:

```bash
npm run configurar:idl -- ./idl.json
npm run verificar
npm run dev
```

El primer comando regenera el cliente de Codama y cambia `src/config/programa.json` a modo de despliegue. No se deben publicar afirmaciones de pruebas funcionales hasta ejecutarlas en Devnet. Consulta `docs/CERTIFICACION-ADVANCED-DIEGO.md`.
