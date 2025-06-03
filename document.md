
---

## 📜 Documentación: Sistema `ScenePlayer`

### 🎮 ¿Qué es `ScenePlayer`?

`ScenePlayer` es un **motor de escenas secuenciales** para juegos narrativos. Permite orquestar una serie de pasos (`steps`) que pueden incluir:

* Diálogos animados
* Cambios de imagen/fondo con transiciones
* Sonidos, decisiones, animaciones, y acciones personalizadas

Cada paso es ejecutado en orden y el sistema gestiona el flujo automáticamente.

---

## 🔧 Archivo principal: `ScenePlayer.js`

### 🔹 Props:

* `steps: Array` → Lista de pasos creados con `createStep(...)`.

---

### 🧱 Estructura de un `step`

Cada paso es un objeto creado con `createStep(order, name, type, action?, execute?)`.

```js
createStep(2, 'Cambio de imagen', ActionTypes.IMAGE, () => ({
  src: someImage,
  nombre: 'imagen-id',
  fullscreen: true,
  transition: 'strong',
}));
```

#### Parámetros:

* `order`: número de orden (usado para saber en qué posición está).
* `name`: nombre descriptivo del paso (para debug/log).
* `type`: tipo de acción (ver más abajo).
* `action`: función que devuelve configuración si aplica (solo para ciertos tipos).
* `execute`: booleano, si se debe ejecutar o saltar el paso (default `true`).

---

### 🔸 Tipos de acción (`ActionTypes`):

```js
export const ActionTypes = {
  DIALOGUE: 'dialogue',
  IMAGE: 'image',
  SOUND: 'sound',
  DECISION: 'decision',
  ANIMATION: 'animation',
  CUSTOM: 'custom',
};
```

---

## 🗨️ Diálogos (`DIALOGUE`)

### Formato de los datos del paso:

```js
step.data = [
  { speaker: 'Kael', text: '¿Dónde estamos?', color: '#ccc', x: '60%', y: '75%' },
  { speaker: 'Lyria', text: 'Cerca del bosque.' }
];
```

### Componente: `DialogueSequence.js`

* Controla la secuencia animada de cada diálogo.
* Cada cuadro se muestra con efectos (fade, animaciones, sonido por letra).
* Al avanzar al final, llama automáticamente a `onEnd()` para que `ScenePlayer` continúe.

---

## 🖼️ Imágenes (`IMAGE`)

### `step.action()` debe devolver un objeto:

```js
() => ({
  src: fondoBosque,
  nombre: 'fondo-principal',
  fullscreen: true,
  zIndex: 0,
  opacity: 1,
  transition: 'soft', // o 'strong'
})
```

#### Claves posibles:

* `src`: fuente de la imagen
* `nombre`: ID única de imagen (para reemplazo o eliminación)
* `fullscreen`: si ocupa toda la pantalla (`true/false`)
* `x`, `y`: posición personalizada (si no es fullscreen)
* `zIndex`, `opacity`, `transition`: control visual

### Para borrar una imagen:

```js
() => ({ src: null, nombre: 'fondo-principal' });
```

---

### Componente: `ImageManager.js`

Se encarga de mostrar cada imagen con transición de opacidad.

* Si `fullscreen` es `true`: ocupa `100vw x 100vh`.
* Si es falso, usa `x`, `y`, `width`, `height`.
* `transition`: 'soft' (600ms) o 'strong' (1200ms).
* Se actualiza automáticamente si cambia el `src`.

---

## 🔊 Otros Tipos

### `SOUND`, `DECISION`, `ANIMATION`, `CUSTOM`

Actualmente no implementados explícitamente, pero el motor los ejecuta si tienen una función `action()` válida. Puedes extender el motor para agregar efectos personalizados según el tipo.

```js
createStep(10, 'Reproducir sonido', ActionTypes.SOUND, () => {
  const audio = new Audio(soundFile);
  audio.play();
});
```

---

## 🔁 Flujo Interno

1. El sistema inicia en el paso 0.
2. Si el paso tiene `execute = false`, lo salta.
3. Si es `DIALOGUE`, muestra `DialogueSequence`, y espera que termine.
4. Si es `IMAGE`, renderiza/actualiza con `ImageManager`, espera la transición.
5. Para otros tipos, ejecuta la función `action()` y avanza tras 1s.

---

## 🔚 Final de secuencia

Cuando se terminan todos los pasos (`currentStepIndex >= steps.length`), el motor se detiene. Puedes envolver el `ScenePlayer` en lógica condicional para pasar a otra escena.

---

## 🧪 Ejemplo completo (resumido)

```js
import ScenePlayer, { createStep, ActionTypes } from './ScenePlayer';
import fondo from '../img/bosque.jpg';

const steps = [
  createStep(0, 'Mostrar fondo', ActionTypes.IMAGE, () => ({
    src: fondo,
    nombre: 'fondo-bosque',
    fullscreen: true,
  })),
  createStep(1, 'Introducción', ActionTypes.DIALOGUE),
];
steps[1].data = [
  { speaker: 'Narrador', text: 'Todo comenzó con un fuego en la noche.' },
];

export default function EscenaIntro() {
  return <ScenePlayer steps={steps} />;
}
```

---

## 📁 Archivos y responsabilidades

| Archivo               | Responsabilidad                                        |
| --------------------- | ------------------------------------------------------ |
| `ScenePlayer.js`      | Orquestador principal, ejecuta los pasos en orden.     |
| `ImageManager.js`     | Renderiza y anima imágenes con transición.             |
| `DialogueSequence.js` | Controla secuencia de diálogo animado.                 |
| `DialogueBox.js`      | Muestra el cuadro de texto de cada diálogo individual. |

---