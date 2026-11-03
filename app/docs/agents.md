# Agentes de desarrollo y coordinación

## Contrato operativo

El agente principal coordina el trabajo de esta conversación. La configuración
de proyecto `.codex/config.toml` registra perfiles TOML en `app/agents/`. No se
agregan agentes ni dependencias a la aplicación publicada. Esta configuración
de herramientas y el `AGENTS.md` son metadatos de desarrollo; el código del sitio
y la SSOT permanecen en `app/`.

| Rol | Perfil | Responsabilidad | Escritura |
| --- | --- | --- | --- |
| Orquestador | app/AGENTS.md | Acotar, asignar, integrar, esperar resultados y reportar | Dentro del alcance autorizado |
| analista | app/agents/analista.toml | Analizar nuevos requerimientos, detectar vacíos o ambigüedades, formular preguntas de clarificación y definir criterios de aceptación | Sin editar código de producción |
| disenador | app/agents/disenador.toml | Diseñar y validar cada ventana, componente e interacción visual de la interfaz (UI/UX, temas, responsividad y accesibilidad) | Sin editar código de producción |
| implementador | app/agents/implementador.toml | Implementar cambios acotados según análisis y diseño | Solo archivos asignados |
| qa_tester | app/agents/qa-tester.toml | Ejecutar pruebas unitarias focalizadas en cambios pequeños y la suite completa al preparar commit/sincronización | Sin editar; salidas temporales de herramientas permitidas |
| auditor | app/agents/auditor.toml | Ejecutar todas las auditorías de arneses y guardrails al momento del commit y sincronización | Sin editar |

Los roles heredan modelo, permisos y servicios de la sesión. Las restricciones de
escritura indicadas son instrucciones de trabajo, no un sandbox independiente.
Máximo cinco subagentes concurrentes además del principal; sin delegación recursiva.

## Cadencia de Pruebas y Auditorías (Regla de Agilidad vs. Pre-Commit)

1. **Durante cambios pequeños o iterativos de desarrollo:**
   - Para evitar retrasos innecesarios, **únicamente se ejecutan pruebas unitarias focalizadas** (`npm run test:unit` o `npx vitest run <archivo-unitario>` pertinente al cambio).
   - No se corre toda la batería pesada de arneses (caos, sensorial, 20 viewports) ni guardrails en cada ajuste menor.
2. **Al momento de ejecutar Commit y Sincronización (`git commit` / `git push`):**
   - Solo cuando Chris ordena hacer commit y sincronizar, se ejecutan **todas las pruebas configuradas en el proyecto** (`npm test`), y el subagente **`auditor`** valida todos los **arneses** y los **guardrails** (`npm run audit:guardrails`), además de verificar `npm run build`.

## Flujo obligatorio

1. El principal lee documentación y estado Git; registra los cambios previos.
2. Ante un nuevo requerimiento o cambio de interfaz:
   - Se apoya en **`analista`** para clarificar requerimientos escuetos o ambiguos y formular preguntas al usuario si hace falta.
   - Se apoya en **`disenador`** para definir y validar las ventanas e interacciones visuales del rediseño o ajuste UI/UX.
3. Para la implementación, delega en **`implementador`** con objetivo, entradas, archivos asignados (un único escritor por archivo), límites, comprobaciones unitarias y resultado esperado.
4. Durante ajustes pequeños, **`qa_tester`** o **`implementador`** verifican mediante pruebas unitarias rápidas sobre los archivos terminados.
5. Cuando el usuario solicita **commit y sincronización**, el principal convoca a **`qa_tester`** y **`auditor`** para ejecutar todas las pruebas, validar los arneses y auditar los guardrails.
6. El principal espera los informes, resuelve discrepancias, informa evidencia y actualiza `app/docs/MEMORY.md`. Commit y push requieren orden expresa de Chris y las puertas de calidad superadas.

Formato de devolución: estado; alcance; archivos; hallazgos con ubicación;
comandos y códigos de salida; pruebas aprobadas/fallidas; pendientes y limitaciones.

## Activación y uso

Abra este repositorio como proyecto confiable en una sesión compatible.
Los perfiles están definidos tanto en `.codex/config.toml` (`app/agents/*.toml`) como registrados en la sesión activa de subagentes (`analista`, `disenador`, `implementador`, `qa_tester`, `auditor`).

Ejemplo: «Analice este requerimiento con `analista`, valide la propuesta visual con `disenador`, implemente con `implementador` verificando pruebas unitarias con `qa_tester`, y al hacer commit ejecute la auditoría total con `auditor`».
