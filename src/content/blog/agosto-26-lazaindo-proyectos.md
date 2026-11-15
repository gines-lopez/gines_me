---
title: 'Agosto’26 - LazAIndo proyectos'
description: 'Balance de agosto: cero WordPress, dos proyectos lanzados (gines.me y docentemente.com), uno en camino para septiembre y cómo he usado la IA en cada uno.'
pubDate: 2026-08-30
heroImage: '../../assets/agosto-26-lanzaindo-proyectos.png'
draft: true
---

Agosto ha sido un mes curioso, el de quitarme el miedo a la IA[^1]. Acabé julio con tres proyectos en mente -te voy a descubrir el que se lanza en septiembre- y con dos WordPress instalados. Agosto acaba con 0 WordPress:

- [gines.me](https://gines.me) - este proyecto, montado sobre Astro.
- [docentemente.com](https://www.docentemente.com) - está en Substack, ya le quité en mayo el WordPress y el ghost.
- [codigofp](#) - el nuevo ya no tiene WordPress, va con Astro.

En agosto he lanzado los dos primeros, el otro se va septiembre.

Lo que he comprobado es que la IA es buen copiloto pero como lo dejes pensar más de la cuenta te lleva a lo que ella quiere. Muestra es que esta web inicialmente tenía un rojo como color principal y ha terminado con negro - que por cierto, me encanta. La verdad que he disfrutado mucho jugando con Claude Code y Astro. Al final ha quedado una web que vuela y que tiene lo que necesito.

Soy consciente que el resultado de gines.me no es el que quiero, que lo pondré patas arriba y le meteré un rediseño más bien pronto que tarde, pero oye, para un par de tardes no está nada mal.

En cuanto a [docentemente](https://www.docentemente.com/), pues arrancamos la newsletter con una primera edición el 16/08/2026, fecha muy relevante en casa. Hay que decir que el *substack* estaba creado antes y que tenía la friolera de 8 suscriptores. Ha terminado el mes con 9. Aquí también he tirado mucho de IA pero para generar el *lead magnet*, las [redes sociales](https://www.instagram.com/docentementecom/) y poco más.

docentemente.com es un proyecto que ha mutado mucho durante el curso 25/26. Pasó de ser el *hub*[^2] de lo que quería montar a ser la [carta que mando](https://www.docentemente.com/embed) cada domingo a compañeros docentes. De momento, este mes han salido tres ediciones.

En lo que sí que no he hecho uso de la IA ha sido en la redacción de contenido. Ya sabes [cómo uso la IA](https://gines.me/uso-ia-en-el-proyecto/), y eso no cambia en los proyectos en los que empiezo. En docentemente las cartas han sido redactadas los viernes por la noche cuando mi hija, C., se quedaba durmiendo. Esta constancia me ha ayudado a generar un compromiso y una rutina que llevo buscando implementar desde hace años.

En lo que sí que me apoyé en la IA en este proyecto fue en el calendario editorial. No miento, me ha sido cómodo tener un esbozo de lo que tengo que escribir. Le pasé 40 ideas que acumulé en un Notion y Fable los clasificó en 52 semanas de contenido. El prompt fue muy sencillo:

```
# ROL

Eres editor/a de contenidos especializado/a en newsletters. Tu trabajo es convertir un banco de ideas en bruto en un calendario editorial ejecutable.

# FUENTES DE DATOS

1. **Base de datos de Notion: "Ideas Contenido"**
   - Léela completa antes de planificar.
   - Ignora las ideas con estado {{estados a descartar: ej. "Descartada", "Publicada"}}.
   - Si una propiedad que necesitas no existe, dilo en lugar de inventarla.
2. **Fichero adjunto de pilares de contenido (.md)**
   - Es la fuente de verdad. No inventes pilares nuevos ni renombres los existentes.
   - Si el fichero define porcentajes o prioridades por pilar, respétalos.
3. **Calendario escolar de {{comunidad/país: ej. Comunitat Valenciana, curso 2026-27}}**
   - Ten en cuenta: inicio y fin de curso, vacaciones de Navidad, Semana Santa, festivos locales, periodos de exámenes y la "vuelta al cole".
   - Si no tienes el calendario oficial confirmado, búscalo; si no puedes, márcalo como supuesto en una sección aparte.

# TAREA

Genera un calendario editorial para la newsletter con estos parámetros:

- Periodo: {{ej. septiembre 2026 – agosto 2027}}
- Frecuencia: {{ej. 1 envío semanal, los domingos}}

# REGLAS DE PLANIFICACIÓN

1. Cada envío se asigna a **un único pilar principal**. Reparte los pilares de forma equilibrada y evita repetir el mismo pilar en dos envíos consecutivos.
2. Prioriza las ideas existentes de Notion. Solo crea ideas nuevas si faltan huecos por cubrir, y márcalas con el prefijo `[NUEVA]`.
3. Ajusta el contenido al momento escolar: contenido de arranque y organización en septiembre, gestión del estrés en época de exámenes planes y descanso en vacaciones, cierre y balance en junio.
4. **Reduce o adapta la cadencia en periodos de vacaciones** si el envío no aporta valor en esas fechas; justifícalo en la columna de notas.

# FORMATO DE SALIDA
Primero, una tabla con una fila por envío y estas columnas:
| Nº | Fecha | Pilar | Titular provisional | Idea origen (Notion) | Gancho estacional | CTA | Estado |

Después, tres secciones breves:
- **Reparto por pilar**: nº de envíos y % de cada pilar, para verificar el equilibrio.
- **Huecos y riesgos**: fechas sin idea sólida, pilares infrarrepresentados, ideas de Notion que has descartado y por qué.
- **Supuestos**: todo lo que has dado por hecho (calendario escolar, campos de Notion ausentes, etc.).

# ANTES DE EMPEZAR
Si falta información crítica (frecuencia, periodo, estructura de la base de datos), haz un máximo de 3 preguntas concretas. Si no falta nada, empieza directamente. No rellenes huecos con contenido genérico: es preferible marcar un hueco como pendiente.

```

Está claro que trabajé con un proyecto de Claude, y con más ficheros que lo alimentan como: lore o público objetivo. La verdad que el curso de [soy mas listo que la IA](https://soy.maslistoquelaia.com) me ayudó a dar claridad a todo esto.

En fin, que agosto ha dado para mucho y septiembre viene fuerte: nuevo centro (IES Thiar), nuevo proyecto y C. empieza el colegio. Veremos a ver como acaba la siguiente hoja del calendario. Si quieres que comentemos algo de lo expuesto en este post, no dudes en ponerte en [contacto](https://gines.me/contacto/).

[^1]: Sé que no es necesario, pero Inteligencia Artificial (IA) === *Artificial Intelligence* (AI).
[^2]: *Hub* como concepto de almacenar cosas.
