# Base de datos PostgreSQL

## Estado

La migración [`migrations/0001_init.sql`](migrations/0001_init.sql) define el modelo inicial revisable. **No se ha ejecutado** en esta entrega: no hay conexión, base de datos, credenciales ni servicio PostgreSQL configurado. La aplicación pública arranca con contenido de demostración y no simula una base operativa.

## Qué contiene

| Esquema | Propósito |
| --- | --- |
| `app` | Cuentas administrativas, roles y asignaciones. Sin autenticación implementada. |
| `content` | Perfil institucional, horarios, páginas, revisiones editoriales, perfil pastoral y metadatos de recursos. |
| `ministry` | Grupos comunitarios y actividades, sin datos reales. |
| `project` | Avances de obra y cifras financieras separadas: presupuesto, ejecutado y recaudo. |
| `donations` | Referencias de pago y eventos del proveedor, sin datos de tarjetas ni datos personales de donantes. |
| `audit` | Registro append-only de acciones y resultados. |

## Decisiones relevantes

- El dinero usa `numeric(16,2)`; no se usa `float`, `real` ni `double precision`.
- `budget_amount`, `executed_amount` y `raised_amount` son columnas distintas. El valor ejecutado no se presenta como recaudo.
- Una cifra pública requiere aprobación registrada (`approved_by`, `approved_at`).
- Los cambios de destino financiero exigen dos personas distintas; el esquema impide que una cuenta se conceda un rol a sí misma, pero la regla de aprobación se aplica en servidor.
- La auditoría no admite `UPDATE`, `DELETE` ni `TRUNCATE`.
- Los recursos públicos requieren permiso de uso concedido.
- No hay tablas para tarjetas, cuentas bancarias, códigos QR ni cuerpos completos de eventos de pago.

## Cómo revisarla más adelante

No ejecutar contra una base existente. Cuando exista una base desechable y revisión independiente:

```powershell
# Ejemplo de forma; sustituir por una base local desechable y un usuario con privilegios mínimos.
psql "postgresql://USUARIO:CLAVE@127.0.0.1:5432/casa_de_dios_pruebas" -v ON_ERROR_STOP=1 -f db/migrations/0001_init.sql
```

Después de aplicarla, comprobar como mínimo:

1. Que `numeric` rechaza valores no monetarios y que no existe coma flotante en columnas de dinero.
2. Que una cifra no puede publicarse sin aprobación.
3. Que `UPDATE`, `DELETE` y `TRUNCATE` sobre `audit.event` fallan.
4. Que un recurso no puede ser público sin permiso concedido.
5. Que los eventos de proveedor duplicados no se insertan dos veces.
6. Que los roles y privilegios de la aplicación aplican mínimo privilegio.
7. Que una restauración desde copia conserva la integridad.

Estas pruebas **no se han realizado**. No afirmar que PostgreSQL está validado hasta ejecutarlas en un entorno aislado.
