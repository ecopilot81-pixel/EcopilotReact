import { useEffect, useRef, useState } from "react";
import titiAvatar from "../assets/titi-cabeciblanco.png";

const DRAG_THRESHOLD = 5;

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const didDrag = useRef(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handlePointerDown(event) {
    if (event.button !== 0) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
      height: bounds.height,
    };
    didDrag.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragStart.current) return;

    const deltaX = event.clientX - dragStart.current.pointerX;
    const deltaY = event.clientY - dragStart.current.pointerY;

    if (
      !didDrag.current &&
      Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD
    ) {
      return;
    }

    didDrag.current = true;
    setIsDragging(true);
    setPosition({
      x: Math.max(
        8,
        Math.min(
          window.innerWidth - dragStart.current.width - 8,
          dragStart.current.left + deltaX
        )
      ),
      y: Math.max(
        8,
        Math.min(
          window.innerHeight - dragStart.current.height - 8,
          dragStart.current.top + deltaY
        )
      ),
    });
  }

  function handlePointerUp() {
    dragStart.current = null;
    setIsDragging(false);
  }

  function handlePointerCancel() {
    dragStart.current = null;
    didDrag.current = false;
    setIsDragging(false);
  }

  function handleWidgetClick() {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    setIsOpen(true);
  }

  const widgetPosition = position
    ? { left: `${position.x}px`, top: `${position.y}px`, right: "auto", bottom: "auto" }
    : undefined;

  return (
    <aside className="floating-chatbot" style={widgetPosition} aria-label="Chat con Tití">
      {isOpen && (
        <section className="floating-chatbot__panel" aria-labelledby="floating-chatbot-title">
          <header className="floating-chatbot__header">
            <div>
              <h2 id="floating-chatbot-title">Chat con Tití</h2>
              <p>Asistente de Eco-Pilot</p>
            </div>
            <button
              className="floating-chatbot__close"
              type="button"
              aria-label="Cerrar chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>
          <div className="floating-chatbot__messages" aria-live="polite">
            <p className="floating-chatbot__message">
              ¡Hola! Pronto estaré listo para responder tus preguntas.
            </p>
          </div>
          <div className="floating-chatbot__composer">
            <input
              type="text"
              aria-label="Mensaje"
              placeholder="El chat estará disponible pronto"
              disabled
            />
            <button type="button" aria-label="Enviar mensaje" disabled>
              ↑
            </button>
          </div>
        </section>
      )}

      <button
        className={`floating-chatbot__welcome${isDragging ? " is-dragging" : ""}`}
        type="button"
        aria-label="Hola, soy Tití. ¿En qué puedo ayudarte?"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleWidgetClick}
      >
        <span>Hola, soy Tití. ¿En qué puedo ayudarte?</span>
        <img src={titiAvatar} alt="" draggable="false" />
      </button>
    </aside>
  );
}
