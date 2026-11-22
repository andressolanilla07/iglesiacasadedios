# CDD-003 · Donaciones y protección del destino

## Estado actual

La propuesta no recibe pagos ni datos personales. No muestra cuentas bancarias ni QR. Las interacciones son informativas. La CSP es una medida complementaria; no evita cambios maliciosos hechos por alguien con acceso al código o al despliegue.

## Requisitos para producción

| Riesgo | Control requerido | Evidencia antes de habilitar |
| --- | --- | --- |
| Sustitución del beneficiario | Beneficiario configurado en servidor; nunca aceptado del navegador ni editable por redactores | Revisión de configuración y pago de prueba conciliado |
| Cambio de enlace o QR | Lista explícita de destinos aprobados; cambios bajo revisión independiente; verificar QR decodificado y titular | Registro de aprobación por dos responsables |
| Cuenta administrativa comprometida | MFA, mínimo privilegio, recuperación custodiada, separación de editor y administrador de pagos | Revisión de accesos y recuperación |
| Cambios maliciosos en GitHub | Protección de main, revisión obligatoria independiente, impedir autoaprobación y restringir administradores de despliegue | Prueba de rechazo de un cambio sin revisión |
| Webhook falso o repetido | Verificación según documentación oficial de la pasarela, idempotencia y validación de importe/moneda/referencia | Casos válidos, falsos, repetidos y fuera de orden |
| Estado de pago falsificado | Confirmación consultada al proveedor y conciliación; nunca confiar solo en URL de retorno | Pago exitoso, pendiente y rechazado |
| Exposición de secretos | Credenciales solo en servidor/gestor de secretos, nunca en HTML, JS, commits o logs | Revisión del paquete y del historial |
| Edición no trazable | Auditoría de cambios con actor, fecha, valor anterior/nuevo y aprobación; acceso restringido | Registro de ensayo y procedimiento de restauración |

Estos son requisitos pendientes; no se declaran implementados por tener este documento. Un sitio estático no puede garantizar por sí mismo la integridad del destino si se compromete la cuenta de despliegue.

## Privacidad y operación

Usar el checkout del proveedor para los datos de tarjetas. Recoger solo los datos necesarios y definir aviso de privacidad y retención antes de recoger información. Las peticiones de oración pueden contener información sensible; no se habilitará su recepción sin definir consentimiento, responsables, acceso y eliminación. No publicar información personal de donantes ni capital reservado.

Antes de activar: confirmar nombre legal y documentos con la iglesia, titularidad del beneficiario, medios nacionales e internacionales, tarifas y moneda; integrar entorno de pruebas; revisar accesos; completar pruebas y conciliación; autorizar el paso a producción. No prometer deducibilidad tributaria o certificación de donaciones sin validación competente.

## Respuesta a incidentes

Si existe sospecha de desvío: deshabilitar la entrada de pagos, conservar evidencias y auditoría, avisar al responsable autorizado de la iglesia, verificar con la pasarela, revocar credenciales comprometidas y restaurar desde una versión revisada antes de reactivar.
