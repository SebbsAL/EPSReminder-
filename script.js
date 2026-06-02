class EpsFormModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Monitorea el atributo 'open' para saber cuándo mostrar u ocultar la ventana
    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
            if (backdrop) {
                if (newValue === 'true') {
                    backdrop.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
                } else {
                    backdrop.classList.remove('active');
                    document.body.style.overflow = ''; // Libera el scroll
                }
            }
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Fondo difuminado y oscuro de la ventana emergente */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(13, 11, 20, 0.85);
                    backdrop-filter: blur(10px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.4s ease;
                }

                .modal-backdrop.active {
                    opacity: 1;
                    pointer-events: auto;
                }

                /* Contenedor del Formulario */
                .form-container {
                    background-color: #161224;
                    width: 90%;
                    max-width: 580px;
                    max-height: 85vh;
                    overflow-y: auto;
                    padding: 2.5rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(229, 145, 182, 0.2);
                    border: 2px solid #7a1f4a;
                    position: relative;
                    transform: translateY(-30px);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-sizing: border-box;
                }

                .modal-backdrop.active .form-container {
                    transform: translateY(0);
                }

                /* Botón de cerrar (X) */
                .close-button {
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    background: none;
                    border: none;
                    color: #e591b6;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    transition: color 0.2s;
                }

                .close-button:hover {
                    color: #ffffff;
                }

                h2 {
                    color: #e591b6;
                    margin-top: 0;
                    margin-bottom: 0.5rem;
                    font-size: 2rem;
                    text-align: center;
                }

                .subtitle {
                    color: #a69fb0;
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 0.95rem;
                }

                .form-group {
                    margin-bottom: 1.4rem;
                }

                label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #e591b6;
                    font-size: 0.95rem;
                }

                input, select {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #7a1f4a;
                    border-radius: 12px;
                    font-size: 1rem;
                    color: #ffffff;
                    background-color: #1e1933;
                    box-sizing: border-box;
                    outline: none;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                input:focus, select:focus {
                    border-color: #e591b6;
                    box-shadow: 0 0 10px rgba(229, 145, 182, 0.4);
                }

                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    cursor: pointer;
                }

                .btn-submit {
                    width: 100%;
                    background: linear-gradient(135deg, #7a1f4a, #94295c);
                    color: white;
                    border: none;
                    padding: 16px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    border-radius: 30px;
                    cursor: pointer;
                    margin-top: 1rem;
                    box-shadow: 0 6px 20px rgba(122, 31, 74, 0.3);
                    transition: all 0.3s;
                }

                .btn-submit:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(229, 145, 182, 0.4);
                }

                .form-container::-webkit-scrollbar {
                    width: 8px;
                }
                .form-container::-webkit-scrollbar-thumb {
                    background: #7a1f4a;
                    border-radius: 10px;
                }
            </style>

            <div class="modal-backdrop">
                <div class="form-container">
                    <button class="close-button" id="close-btn">&times;</button>
                    <h2>Agendar un Recordatorio</h2>
                    <div class="subtitle">Ingresa la información necesaria para coordinar tu alerta.</div>
                    
                    <form id="reminder-form">
                        <div class="form-group">
                            <label for="fullName">Nombre Completo</label>
                            <input type="text" id="fullName" name="fullName" placeholder="Ingresa tu nombre completo" required>
                        </div>

                        <div class="form-group">
                            <label for="age">Edad</label>
                            <input type="number" id="age" name="age" min="1" max="120" placeholder="Ej. 23" required>
                        </div>

                        <div class="form-group">
                            <label for="gender">Género</label>
                            <select id="gender" name="gender" required>
                                <option value="" disabled selected>Selecciona una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="eps">EPS</label>
                            <select id="eps" name="eps" required>
                                <option value="" disabled selected>Selecciona tu EPS</option>
                                <option value="Sura">Sura</option>
                                <option value="Coomeva">Coomeva</option>
                                <option value="Sanitas">Sanitas</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="appointmentDate">Fecha de Cita</label>
                            <input type="date" id="appointmentDate" name="appointmentDate" required>
                        </div>

                        <div class="form-group">
                            <label for="location">Sede</label>
                            <select id="location" name="location" required>
                                <option value="" disabled selected>Selecciona una sede</option>
                                <option value="Bucaramanga">Bucaramanga</option>
                                <option value="Floridablanca">Floridablanca</option>
                                <option value="Giron">Girón</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="discordUser">Nombre de usuario de Discord</label>
                            <input type="text" id="discordUser" name="discordUser" placeholder="Ej. 123456789012345678" required>
                        </div>

                        <button type="submit" class="btn-submit" id="submit-btn">Confirmar y Guardar</button>
                    </form>
                </div>
            </div>
        `;

        const closeBtn = this.shadowRoot.querySelector('#close-btn');
        const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        const form = this.shadowRoot.querySelector('#reminder-form');
        const submitBtn = this.shadowRoot.querySelector('#submit-btn');

        const closeModal = () => this.removeAttribute('open');

        closeBtn.addEventListener('click', closeModal);
        
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });

        // --- CONEXIÓN ASÍNCRONA CON EL WEBHOOK DE N8N ---
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Deshabilitamos el botón para evitar múltiples envíos durante la petición
            submitBtn.disabled = true;
            submitBtn.textContent = 'Procesando...';

            // Mapeo dinámico de los campos usando this.shadowRoot para cruzar con n8n
            const formData = {
                nombre: this.shadowRoot.querySelector('#fullName').value,
                edad: this.shadowRoot.querySelector('#age').value,
                genero: this.shadowRoot.querySelector('#gender').value,
                plan: this.shadowRoot.querySelector('#eps').value, // Tu switch evalúa los planes/EPS
                fecha_inicio: this.shadowRoot.querySelector('#appointmentDate').value,
                sede: this.shadowRoot.querySelector('#location').value,
                id_usuario: this.shadowRoot.querySelector('#discordUser').value // El ID numérico mapeado correctamente
            };

            // URL del Webhook (Usa la de Test para tus pruebas iniciales y cambia a Production al desplegar)
            const WEBHOOK_URL = 'https://yapping-childless-baggage.ngrok-free.dev/webhook/agendar-cita';

            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('¡Recordatorio registrado de forma exitosa en el sistema, enviando a Discord tu recordatorio!');
                    form.reset();
                    closeModal();
                } else {
                    throw new Error('Respuesta incorrecta por parte del servidor backend.');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                alert('Hubo un inconveniente al procesar la cita médica con el backend. Verifica que n8n y ngrok estén corriendo.');
            } finally {
                // Restablecemos el botón al estado original
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirmar y Guardar';
            }
        });
    }
}

// Registrar el Web Component
customElements.define('eps-form-component', EpsFormModal);