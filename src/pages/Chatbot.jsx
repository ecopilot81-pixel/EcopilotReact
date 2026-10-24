import { useEffect, useState } from "react";
import { getMyChatHistory, sendChatMessage } from "../services/auth";

export default function Chatbot() {
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    // Carga solo el historial de la sesión activa y cancela la solicitud al salir.
    getMyChatHistory({ signal: controller.signal })
      .then(setHistory)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Guarda la pregunta en el backend y añade al historial el registro devuelto.
  async function handleSubmit(event) {
    event.preventDefault();
    const message = question.trim();

    if (!message || sending) {
      return;
    }

    setSending(true);
    setError("");

    try {
      const savedMessage = await sendChatMessage(message);
      setHistory((currentHistory) => [...currentHistory, savedMessage]);
      setQuestion("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Asistente EcoPilot</span>
        <h1>Chatbot IA</h1>
        <p>Consulta tus preguntas guardadas y prepara una consulta para el asistente.</p>
      </header>

      <section className="visual-panel">
        <h2>Enviar una pregunta</h2>
        {/* El envío guarda la consulta; la respuesta automática aún no está integrada. */}
        <p>La pregunta se guardará en tu historial. La respuesta automática se integrará después.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chat-question">Tu pregunta</label>
          <textarea
            id="chat-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={10000}
            rows={4}
            required
            disabled={sending}
          />
          <button type="submit" disabled={sending || !question.trim()}>
            {sending ? "Guardando..." : "Enviar pregunta"}
          </button>
        </form>
      </section>

      <section className="visual-panel" aria-labelledby="chat-history-heading">
        <h2 id="chat-history-heading">Mi historial</h2>
        {loading && <p role="status" className="visual-data-message">Cargando historial...</p>}
        {error && <p role="alert" className="visual-data-message visual-data-message--error">{error}</p>}
        {!loading && !error && history.length === 0 && (
          <p className="visual-data-message">Todavía no tienes preguntas guardadas.</p>
        )}
        {!loading && history.length > 0 && (
          <div className="visual-two-column">
            {history.map((entry) => (
              <article className="visual-panel" key={entry.id}>
                <h3>Tu pregunta</h3>
                <p>{entry.pregunta_usuario}</p>
                <h3>Respuesta del asistente</h3>
                <p>{entry.respuesta_bot || "Pendiente: el chatbot de IA aún no está conectado."}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
