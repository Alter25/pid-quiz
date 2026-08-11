---
tags: [mecánica, refinería, válvulas, PID, estudio]
fecha: 2026-08-10
---

# Válvulas usadas en la industria de refinería

Listado de las válvulas más comunes en plantas de proceso (refinerías, petroquímicas), con sus características principales, usos típicos y simbología P&ID en SVG (los símbolos son representaciones simplificadas basadas en ISA-5.1 / ISO 10628, útiles para reconocimiento rápido, no para planos oficiales).

---

## 1. Válvula de Compuerta (Gate Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="black"/>
  <line x1="45" y1="10" x2="45" y2="0" stroke="black" stroke-width="2"/>
  <rect x="38" y="-8" width="14" height="8" fill="none" stroke="black" stroke-width="2"/>
</svg>

- **Función:** Todo/Nada (ON/OFF). No se usa para regular flujo.
- **Características:**
  - El cierre es una compuerta (cuña) que se desliza perpendicular al flujo.
  - Baja caída de presión cuando está totalmente abierta (flujo en línea recta).
  - Requiere varias vueltas del volante para abrir/cerrar por completo.
  - Mal desempeño si se usa parcialmente abierta (erosión de la cuña y el asiento).
- **Usos típicos:** Líneas principales de crudo, aislamiento de equipos (bombas, intercambiadores) durante mantenimiento.
- **Símbolo:** Bowtie (dos triángulos) sólido, relleno completo = cerrada / hueco = abierta.

---

## 2. Válvula de Globo (Globe Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="none" stroke="black" stroke-width="2"/>
  <line x1="45" y1="10" x2="45" y2="0" stroke="black" stroke-width="2"/>
  <line x1="30" y1="30" x2="60" y2="30" stroke="black" stroke-width="2"/>
  <rect x="38" y="-8" width="14" height="8" fill="none" stroke="black" stroke-width="2"/>
</svg>

- **Función:** Regulación de flujo (throttling) y también ON/OFF.
- **Características:**
  - El flujo cambia de dirección internamente (mayor caída de presión que la de compuerta).
  - Buen control de estrangulamiento gracias al diseño del tapón/asiento.
  - Más resistente a la erosión en posiciones parciales que la de compuerta.
- **Usos típicos:** Líneas de vapor, control manual de flujo, drenajes, sistemas de utilities.
- **Símbolo:** Bowtie sin relleno con línea horizontal media (indica el paso interno curvo).

---

## 3. Válvula de Bola (Ball Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="none" stroke="black" stroke-width="2"/>
  <circle cx="45" cy="30" r="10" fill="none" stroke="black" stroke-width="2"/>
  <line x1="39" y1="24" x2="51" y2="36" stroke="black" stroke-width="2"/>
</svg>

- **Función:** Principalmente ON/OFF, aunque existen de "control" (V-ball).
- **Características:**
  - Cierre mediante una esfera perforada que gira 90°.
  - Cierre hermético (bubble-tight), muy usada donde se requiere sello absoluto.
  - Apertura/cierre rápido (¼ de vuelta) — ideal para actuadores automáticos.
  - Bajo mantenimiento, larga vida útil.
- **Usos típicos:** Gas, líneas de proceso con requerimiento de hermeticidad, sistemas de seguridad (ESD - Emergency Shutdown).
- **Símbolo:** Bowtie con círculo (bola) y línea diagonal representando el paso perforado.

---

## 4. Válvula de Mariposa (Butterfly Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="none" stroke="black" stroke-width="2"/>
  <ellipse cx="45" cy="30" rx="4" ry="20" fill="black"/>
</svg>

- **Función:** ON/OFF y regulación en aplicaciones de baja/media presión.
- **Características:**
  - Disco circular que gira sobre un eje central, 90° para abrir/cerrar.
  - Compacta y ligera comparada con compuerta o globo (menor costo en diámetros grandes).
  - Pérdida de carga moderada incluso abierta (el disco siempre está en el flujo).
- **Usos típicos:** Líneas de agua de enfriamiento, aire, líneas de gran diámetro y baja presión.
- **Símbolo:** Bowtie con elipse delgada al centro representando el disco.

---

## 5. Válvula Check (Retención / No-retorno)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,15 30,45 55,30" fill="none" stroke="black" stroke-width="2"/>
  <line x1="60" y1="10" x2="60" y2="50" stroke="black" stroke-width="2"/>
</svg>

- **Función:** Permitir flujo en un solo sentido, evitar contraflujo.
- **Tipos comunes:**
  - **Swing check:** disco tipo bisagra (columpio).
  - **Lift check:** disco se levanta verticalmente (similar a globo).
  - **Wafer/Dual plate check:** dos placas tipo "mariposa", compacta y de respuesta rápida (usada mucho en descarga de bombas).
- **Características:** No tiene actuador ni volante; opera automáticamente por diferencial de presión.
- **Usos típicos:** Descarga de bombas, protección contra golpe de ariete, líneas donde el retorno de fluido dañaría el equipo aguas arriba.
- **Símbolo:** Triángulo apuntando en el sentido de flujo permitido, con una barra vertical (asiento).

---

## 6. Válvula de Control (Control Valve)

<svg width="90" height="80" viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="50" x2="30" y2="50" stroke="black" stroke-width="2"/>
  <line x1="60" y1="50" x2="90" y2="50" stroke="black" stroke-width="2"/>
  <polygon points="30,30 60,30 30,70 60,70" fill="none" stroke="black" stroke-width="2"/>
  <line x1="45" y1="30" x2="45" y2="15" stroke="black" stroke-width="2"/>
  <rect x="30" y="0" width="30" height="15" fill="none" stroke="black" stroke-width="2"/>
  <line x1="60" y1="7" x2="75" y2="7" stroke="black" stroke-width="2" stroke-dasharray="3,2"/>
</svg>

- **Función:** Regulación fina y continua de flujo, presión, nivel o temperatura mediante actuador (generalmente neumático).
- **Características:**
  - Suele ser de cuerpo tipo globo, aunque también existen de bola segmentada o mariposa de alto desempeño.
  - Trabaja junto con un **posicionador** y recibe señal desde el sistema de control (DCS/PLC), típicamente 4–20 mA o 3–15 psi.
  - Puede incluir **falla-abre (FO)** o **falla-cierra (FC)** como condición de seguridad ante pérdida de señal/aire.
- **Usos típicos:** Lazos de control de proceso (PIC, FIC, LIC, TIC) en columnas de destilación, reactores, intercambiadores.
- **Símbolo:** Bowtie con actuador (rectángulo o diafragma arriba) y línea punteada = señal desde el DCS.

---

## 7. Válvula de Alivio y Seguridad (Relief / Safety Valve - PSV)

<svg width="70" height="80" viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="35" y1="80" x2="35" y2="55" stroke="black" stroke-width="2"/>
  <polygon points="15,55 55,55 35,20" fill="none" stroke="black" stroke-width="2"/>
  <line x1="35" y1="20" x2="35" y2="0" stroke="black" stroke-width="2"/>
  <path d="M28,0 q4,-6 4,0 q4,-6 4,0" fill="none" stroke="black" stroke-width="2"/>
</svg>

- **Función:** Proteger equipos y líneas de sobrepresión, liberando fluido automáticamente al alcanzar una presión de disparo (set pressure).
- **Características:**
  - **PRV (Pressure Relief Valve):** para líquidos, abre proporcionalmente a la sobrepresión.
  - **PSV (Pressure Safety Valve):** para gases/vapor, abre de golpe (pop action) al llegar al set point.
  - Cierre por resorte calibrado; puede descargar a la atmósfera o a un sistema de venteo/flare.
  - Es un dispositivo de seguridad crítico — normalmente inspeccionado y certificado periódicamente (API 526, API 520/521).
- **Usos típicos:** Recipientes a presión, calderas, líneas de vapor, sistemas de venteo hacia el flare.
- **Símbolo:** Triángulo apuntando hacia arriba (ángulo de asiento) con resorte en la parte superior, etiqueta "PSV".

---

## 8. Válvula de Diafragma (Diaphragm Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="none" stroke="black" stroke-width="2"/>
  <path d="M30,15 Q45,30 30,45" fill="none" stroke="black" stroke-width="2"/>
  <line x1="45" y1="10" x2="45" y2="0" stroke="black" stroke-width="2"/>
</svg>

- **Función:** ON/OFF y algo de regulación en servicios sucios o corrosivos.
- **Características:**
  - Un diafragma flexible sella contra un asiento, sin partes metálicas en contacto con el fluido.
  - Excelente para fluidos con sólidos en suspensión, corrosivos o que requieren alta limpieza (sanitario).
- **Usos típicos:** Servicios químicos, tratamiento de agua, líneas con lodos o fluidos abrasivos.
- **Símbolo:** Bowtie con curva interna representando el diafragma flexible.

---

## 9. Válvula de Macho / Tapón (Plug Valve)

<svg width="90" height="60" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="30" x2="30" y2="30" stroke="black" stroke-width="2"/>
  <line x1="60" y1="30" x2="90" y2="30" stroke="black" stroke-width="2"/>
  <polygon points="30,10 60,10 30,50 60,50" fill="none" stroke="black" stroke-width="2"/>
  <polygon points="35,20 55,20 50,40 40,40" fill="black"/>
  <line x1="45" y1="10" x2="45" y2="0" stroke="black" stroke-width="2"/>
</svg>

- **Función:** ON/OFF, algunas versiones permiten regulación.
- **Características:**
  - Similar a la de bola pero con un tapón cónico o cilíndrico perforado en vez de esfera.
  - Cierre hermético, robusta, buena para servicios con partículas.
  - Puede ser de puerto completo (full port) o reducido.
- **Usos típicos:** Líneas de gas natural, crudo con sólidos, servicios de proceso donde se requiere alta confiabilidad de sello.
- **Símbolo:** Bowtie con trapecio sólido central (tapón cónico).

---

## Notas rápidas para P&ID (referencia)

| Válvula | ON/OFF | Regulación | Símbolo clave |
|---|---|---|---|
| Compuerta | ✅ | ❌ | Bowtie sólido |
| Globo | ✅ | ✅ | Bowtie + línea media |
| Bola | ✅ | ⚠️ (limitada) | Bowtie + círculo/diagonal |
| Mariposa | ✅ | ✅ | Bowtie + elipse (disco) |
| Check | Automática | ❌ | Triángulo direccional |
| Control | ❌ | ✅✅ (principal uso) | Bowtie + actuador |
| PSV/Alivio | Automática (seguridad) | ❌ | Triángulo + resorte |
| Diafragma | ✅ | ⚠️ | Bowtie + curva |
| Macho/Tapón | ✅ | ⚠️ | Bowtie + trapecio sólido |

> **Nota sobre Obsidian:** el SVG inline se renderiza directamente en la vista previa (Reading View) de Obsidian. Si algún símbolo no se ve, revisa que "Strict line breaks" esté desactivado o que ningún plugin de sanitización de HTML esté bloqueando etiquetas SVG.

---

## Para profundizar después
- [ ] Clases de fugas (Leakage Class) según ANSI/FCI 70-2
- [ ] Materiales de asiento (metal-metal vs blando) y su relación con temperatura
- [ ] Actuadores: neumáticos, eléctricos, hidráulicos — ventajas y desventajas
- [ ] Normas API 600 (compuerta), API 602/608 (bola), API 526 (PSV)
- [ ] Simbología oficial completa según ISA-5.1 (para comparar con estos símbolos simplificados)
