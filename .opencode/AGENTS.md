# Project Rules and Guidelines

Agentes, commands, rules y skills configurados para este proyecto OpenCode.

## Agentes Disponibles

| Agente | Propósito | Cuándo Usar |
|--------|-----------|-------------|
| planner | Planificación de implementación | Features complejos, refactoring |
| code-reviewer | Revisión de código | Después de escribir código |
| security-reviewer | Análisis de seguridad | Antes de commits |
| build-error-resolver | Errores de build | Cuando falla el build |
| e2e-runner | Testing E2E | Flujos críticos del usuario |
| refactor-cleaner | Limpieza de código | Mantenimiento de código |
| tdd-guide | TDD | Nuevas features, bug fixes |
| doc-updater | Documentación | Actualizar docs |

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `/plan` | Crear plan de implementación completo |
| `/tdd` | Implementar con test-driven development |
| `/code-review` | Revisar código calidad y seguridad |
| `/build-fix` | Arreglar errores de build |
| `/refactor-clean` | Remover código muerto |
| `/learn` | Extraer patrones reutilizables |
| `/checkpoint` | Guardar estado de sesión |
| `/verify` | Ejecutar verificación de features |
| `/setup-pm` | Configurar gestor de paquetes |

## Patrones y Best Practices

### TDD Workflow
Siempre seguir el ciclo RED-GREEN-REFactor:
1. Escribir tests que fallen (RED)
2. Implementar código mínimo para pasar (GREEN)
3. Refactorizar manteniendo tests verdes (REFactor)

### 80% Cobertura Mínima
Coverage del 80% es el umbral antes de considerar un feature completo.

### Revisión Siempre Antes de Commit
Usar `/code-review` antes de cada commit/PR.

### Planificación para Features Complejos
Usar `/plan` antes de escribir código en features grandes.

### Gestión de Paquetes
Ejecutar `/setup-pm` en proyectos nuevos o al cambiar de entorno.

## Estructura del Proyecto

```
.openocode/
├── agents/          # Agentes especializados
├── commands/        # Comandos slash
├── AGENTS.md        # Este archivo - reglas del proyecto
├── hooks/           # Hooks de automatización
├── skills/          # Skills/flujos de trabajo
├── opencode.json    # Configuración principal
└── mcp-configs/     # Configuraciones MCP
```

## Hooks Automatizados

Hooks configurados para ejecutarse automáticamente en eventos clave. Ver `.opencode/hooks/hooks.yaml` para detalles.

## Skills Disponibles

Skills organizadas por dominio:
- `continuous-learning` - Auto-extract patrones de sesiones
- `tdd-workflow` - Metodología TDD
- `security-review` - Checklists de seguridad
- `strategic-compact` - Sugerencias de compactación
- `verification-loop` - Verificación continua
- `backend-patterns` - Patrones backend
- `frontend-patterns` - Patrones frontend
- `coding-standards` - Estándares de código

## Cuándo Usar Cada Agente

- **Feature nueva**: `/plan` → `/tdd` → `/code-review`
- **Bug fix**: `/tdd` → `/verify` → `/code-review`
- **Build falla**: `/build-fix`
- **Code review**: `/code-review`
- **Refactoring**: `/refactor-clean` → `/verify`
- **Aprendizaje**: `/learn`
- **Cambiar contexto**: `/checkpoint`
- **Nuevo proyecto**: `/setup-pm`