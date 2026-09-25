const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const servicePanels = document.querySelectorAll('.service-accordion details');
servicePanels.forEach((panel) => {
  panel.addEventListener('toggle', () => {
    if (!panel.open) return;
    servicePanels.forEach((other) => {
      if (other !== panel) other.open = false;
    });
  });
});

const serviceTabs = document.querySelectorAll('.service-tab-nav [data-service]');
const serviceContent = document.querySelectorAll('.service-panel[data-panel]');

serviceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.service;
    serviceTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    serviceContent.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.panel === selected);
    });
  });
});

const tbaFonts = document.getElementById('tba-fonts'); if (tbaFonts) tbaFonts.rel = 'stylesheet';


// Language switcher: local English copy, no external translation service.
const languageButtons = document.querySelectorAll('.lang button[data-language]');
const originalText = new WeakMap();
const englishCopy = {
  "Soluciones": "Services", "Nuestra flota": "Our fleet", "Destinos": "Destinations", "Empresas": "Companies", "Contacto": "Contact",
  "Atenci\u00f3n todos los d\u00edas": "Available every day", "Cotizar traslado": "Request a quote",
  "TRASLADOS PRIVADOS \u00b7 BUENOS AIRES": "PRIVATE TRANSFERS \u00b7 BUENOS AIRES", "Aeropuertos,": "Airports,", "reuniones y rutas.": "meetings and routes.", "Sin improvisar.": "No guesswork.",
  "Ezeiza, Aeroparque, San Fernando y viajes a medida. Definimos horario, punto de encuentro y equipaje antes de que salgas.": "Ezeiza, Aeroparque, San Fernando and tailored journeys. We define the schedule, meeting point and luggage before you leave.",
  "Puerta a puerta": "Door to door", "Desde donde est\u00e9s hasta donde vas": "From where you are to where you need to go", "Llegadas y partidas": "Arrivals and departures",
  "Contanos el viaje": "Tell us about your trip", "Te respondemos por WhatsApp con la coordinaci\u00f3n.": "We will reply on WhatsApp with the coordination.",
  "Tipo de viaje": "Trip type", "Aeropuerto": "Airport", "Punto a punto": "Point to point", "Auto por hora": "Hourly vehicle", "Larga distancia": "Long-distance", "Origen": "Origin", "Destino": "Destination", "Fecha": "Date", "Solicitar cotizaci\u00f3n": "Request a quote",
  "UNA FORMA SIMPLE DE MOVERSE": "A SIMPLE WAY TO TRAVEL", "Un viaje bien resuelto": "A well-organised journey", "empieza antes de salir.": "starts before you leave.",
  "Ya sea una llegada a Ezeiza, una agenda corporativa o un viaje al interior, Traslados Buenos Aires coordina el recorrido con puntualidad, seguridad y comunicaci\u00f3n clara.": "Whether it is an arrival at Ezeiza, a corporate schedule or a trip beyond the city, Traslados Buenos Aires coordinates every journey with punctuality, safety and clear communication.",
  "Reserva y coordinaci\u00f3n": "Booking and coordination", "Seguimiento y confirmaci\u00f3n": "Tracking and confirmation", "Traslado puerta a puerta": "Door-to-door transfer",
  "SERVICIOS": "SERVICES", "Eleg\u00ed el traslado.": "Choose your transfer.", "Nos ocupamos del resto.": "We handle the rest.", "Aeropuertos": "Airports", "Corporativo": "Corporate", "Por hora": "Hourly", "Tours privados": "Private tours", "Especiales": "Special services",
  "Traslados a aeropuertos.": "Airport transfers.", "Coordinamos punto de encuentro, monitoreo de vuelo, recepci\u00f3n con cartel y asistencia con equipaje.": "We coordinate the meeting point, flight monitoring, meet-and-greet service and luggage assistance.", "Llegadas, partidas y conexiones": "Arrivals, departures and connections", "Reservar traslado": "Book a transfer",
  "AGENDA CORPORATIVA": "CORPORATE SCHEDULE", "Movilidad para empresas.": "Mobility for companies.", "Traslados para ejecutivos, equipos y eventos con recorridos, horarios y puntos de espera definidos de antemano.": "Transfers for executives, teams and events with routes, schedules and waiting points agreed in advance.", "Reuniones, equipos y eventos": "Meetings, teams and events", "Consultar servicio": "Ask about this service",
  "AUTO A DISPOSICI\u00d3N": "VEHICLE AT YOUR DISPOSAL", "Tiempo a tu favor.": "Time on your side.", "Veh\u00edculo con chofer para tr\u00e1mites, visitas y recorridos abiertos. La unidad queda disponible durante el tiempo coordinado.": "A chauffeur-driven vehicle for appointments, visits and flexible routes. The vehicle remains available for the agreed time.", "M\u00ednimo de 3 horas": "3-hour minimum", "Cotizar por hora": "Request an hourly quote",
  "INTERURBANOS": "INTERCITY", "Media y larga distancia.": "Medium and long distance.", "Viajes al interior con planificaci\u00f3n previa. Cotizamos seg\u00fan recorrido, horarios, paradas y necesidades de equipaje.": "Trips beyond the city with advance planning. We quote according to route, schedule, stops and luggage needs.", "Desde CABA y Gran Buenos Aires": "From CABA and Greater Buenos Aires", "Pedir cotizaci\u00f3n": "Request a quote",
  "BUENOS AIRES Y ALREDEDORES": "BUENOS AIRES AND SURROUNDINGS", "Recorridos a tu ritmo.": "Tours at your pace.", "Armamos un itinerario privado seg\u00fan intereses, tiempos y los lugares que quieras conocer.": "We create a private itinerary around your interests, timing and the places you want to visit.", "Ciudad, cultura, compras y paseos": "City, culture, shopping and sightseeing", "Ver recorridos": "View tours",
  "COORDINACI\u00d3N CONFIDENCIAL": "CONFIDENTIAL COORDINATION", "Servicios especiales.": "Special services.", "Traslado seguro de documentaci\u00f3n o paquetes peque\u00f1os, con atenci\u00f3n discreta y coordinaci\u00f3n previa.": "Secure transport for documents or small parcels, with discreet service and advance coordination.", "Consultas seg\u00fan requerimiento": "Available on request", "Hablar con Traslados Buenos Aires": "Contact Traslados Buenos Aires",
  "FLOTA PRINCIPAL": "PRIMARY FLEET", "Espacio para llegar c\u00f3modo.": "Space to arrive comfortably.", "Una unidad vers\u00e1til para aeropuertos, traslados ejecutivos y recorridos de larga distancia. Confort, presencia y seguridad en cada viaje.": "A versatile vehicle for airports, executive transfers and long-distance journeys. Comfort, presence and safety on every trip.", "Chofer profesional": "Professional chauffeur", "Amplio espacio para equipaje": "Generous luggage space", "Servicio puerta a puerta": "Door-to-door service", "Consultar disponibilidad": "Check availability",
  "COBERTURA": "COVERAGE", "Donde tu agenda": "Where your schedule", "te necesita.": "needs you.", "Operamos en Buenos Aires y coordinamos viajes de media y larga distancia en todo el pa\u00eds.": "We operate in Buenos Aires and coordinate medium and long-distance trips across Argentina.", "Solicitar un viaje": "Request a trip", "Aeroparque": "Aeroparque", "Aeropuerto Internacional": "International Airport", "Ciudad y Gran": "City and Greater",
  "CONFIAN EN TRASLADOS BUENOS AIRES": "COMPANIES THAT TRUST TRASLADOS BUENOS AIRES", "Empresas que se mueven": "Companies that move", "con nosotros.": "with us.", "Una red que se mueve con precisi\u00f3n.": "A network that moves with precision.",
  "TRASLADOS PARA HU\u00c9SPEDES": "GUEST TRANSFERS", "Del aeropuerto": "From airport", "al hotel, bien coordinado.": "to hotel, well coordinated.", "Trabajamos con hoteles de referencia en Buenos Aires para coordinar recepci\u00f3n en aeropuerto, arribos y traslados privados.": "We work with leading Buenos Aires hotels to coordinate airport meet-and-greets, arrivals and private transfers.", "\u00bfTu hotel no aparece aqu\u00ed?": "Is your hotel not listed here?", "Coordinamos traslados hacia cualquier alojamiento de Buenos Aires.": "We coordinate transfers to any accommodation in Buenos Aires.",
  "BUENOS AIRES A TU RITMO": "BUENOS AIRES AT YOUR PACE", "La ciudad tambi\u00e9n": "The city is also", "es parte del viaje.": "part of the journey.", "Recorridos privados para conocer Buenos Aires con la libertad de ir a tu tiempo.": "Private tours to discover Buenos Aires with the freedom to move at your own pace.", "Cementerio de Recoleta": "Recoleta Cemetery", "Puente de la Mujer": "Women\'s Bridge", "Jard\u00edn Japon\u00e9s": "Japanese Garden", "Floralis Gen\u00e9rica": "Floralis Generica", "Reserv\u00e1 tu recorrido": "Book your tour",
  "COORDINEMOS TU PR\u00d3XIMO VIAJE": "LET US COORDINATE YOUR NEXT TRIP", "Tu traslado empieza": "Your transfer starts", "con una conversaci\u00f3n.": "with a conversation.", "Hablar por WhatsApp": "Chat on WhatsApp", "Movilidad ejecutiva para personas, empresas e instituciones.": "Executive mobility for individuals, companies and institutions.", "NAVEGACI\u00d3N": "NAVIGATION", "Servicios": "Services", "Flota": "Fleet", "CONTACTO": "CONTACT", "WhatsApp": "WhatsApp", "Buenos Aires, Argentina": "Buenos Aires, Argentina"
};


Object.assign(englishCopy, {
  "Ezeiza, Aeroparque y San Fernando. Tarifa informada, punto de encuentro confirmado y seguimiento del vuelo. Coordinamos todo antes de que salgas.": "Ezeiza, Aeroparque and San Fernando. Upfront pricing, confirmed pickup points and flight tracking. Everything is arranged before you travel.",
  "Hasta 4 pasajeros y 3 valijas": "Up to 4 passengers and 3 suitcases",
  "Seguimiento de vuelo y espera coordinada": "Flight tracking and coordinated waiting time",
  "Respondemos en minutos, todos los d?as. Sin compromiso.": "We reply within minutes, every day. No obligation.",
  "Pasajeros y equipaje": "Passengers and luggage",
  "Cotizar": "Request a quote", "Reserva confirmada con anticipo mínimo del 20%.": "Bookings are confirmed with a minimum 20% deposit.", "Ver términos": "View booking terms",
  "Ej. 2 pasajeros ? 2 valijas": "e.g. 2 passengers ? 2 suitcases",
  "C?MO TRABAJAMOS": "HOW WE WORK",
  "Lo que est? claro": "What is clear",
  "antes de subir.": "before you get in.",
  "Precio informado.": "Upfront pricing.",
  "Te pasamos el valor del traslado antes de confirmar la reserva.": "We confirm the transfer price before you book.",
  "Vuelo y encuentro coordinados.": "Flight and pickup coordinated.",
  "Confirmamos el punto de encuentro y seguimos la informaci?n de tu vuelo.": "We confirm your pickup point and follow your flight information.",
  "Recepci?n en arribos.": "Meet & greet on arrival.",
  "Coordinamos la recepci?n y el acompa?amiento hasta el veh?culo.": "We coordinate your arrival welcome and accompany you to the vehicle.",
  "Pago acordado.": "Payment agreed.",
  "Definimos la modalidad de pago junto con tu cotizaci?n.": "We confirm the payment method along with your quote.",
  "M?nimo de 3 horas ? Kilometraje libre dentro de CABA y GBA": "3-hour minimum ? Free mileage within CABA and Greater Buenos Aires",
  "Mar del Plata, Rosario, C?rdoba, Pinamar y cualquier destino del pa?s. Cotizamos seg?n recorrido, horarios, paradas y equipaje.": "Mar del Plata, Rosario, C?rdoba, Pinamar and any destination across Argentina. We quote according to route, schedule, stops and luggage.",
  "ENV?OS PUERTA A PUERTA": "DOOR-TO-DOOR DELIVERY",
  "Encomiendas y documentaci?n.": "Parcels and documents.",
  "Mensajer?a privada para documentos, carpetas o paquetes peque?os. Retiro coordinado y comprobante de entrega.": "Private courier service for documents, folders or small parcels. Coordinated collection and proof of delivery.",
  "Hasta 4 pasajeros": "Up to 4 passengers",
  "3 valijas grandes + equipaje de mano": "3 large suitcases + carry-on luggage",
  "Aire acondicionado, agua y cargadores": "Air conditioning, water and chargers",
  "Chofer con licencia profesional y seguro vigente": "Professional licence and current insurance",
  "CABA, Zona Norte, Oeste y Sur, La Plata, Tigre, Pilar, Nordelta y Costa Atl?ntica.": "CABA, North, West and South Zones, La Plata, Tigre, Pilar, Nordelta and the Atlantic Coast.",
  "Recorridos privados dise?ados alrededor de tus intereses, tus tiempos y tus paradas.": "Private itineraries designed around your interests, schedule and stops.",
  "Cl?sicos porte?os": "Buenos Aires classics",
  "Obelisco, Plaza de Mayo, Recoleta y Puerto Madero": "Obelisk, Plaza de Mayo, Recoleta and Puerto Madero",
  "Sur hist?rico": "Historic south",
  "San Telmo, Caminito y La Boca": "San Telmo, Caminito and La Boca",
  "Buenos Aires a tu ritmo": "Buenos Aires at your pace",
  "Itinerario privado seg?n tus intereses": "Private itinerary based on your interests",
  "A MEDIDA": "TAILORED"
});

englishCopy["VISITANTES INTERNACIONALES"] = "INTERNATIONAL VISITORS";

const translatableAttributes = {
  "Abrir men\u00fa": "Open menu",
  "Selector de idioma": "Language selector",
  "Idioma espanol": "Spanish language",
  "Servicio de traslados privados en la terminal de aeropuerto de Buenos Aires": "Private transfer service at the Buenos Aires airport terminal",
  "BAIC BJ30 de Traslados Buenos Aires": "BAIC BJ30 by Traslados Buenos Aires",
  "Consultar traslado a hotel por WhatsApp": "Ask about a hotel transfer on WhatsApp",
  "Ej. Aeroparque (AEP)": "e.g. Aeroparque (AEP)",
  "Ej. Hotel en CABA": "e.g. Hotel in CABA",
  "Formulario de cotizaci?n": "Quote form",
  "Ej. 2 pasajeros ? 2 valijas": "e.g. 2 passengers ? 2 suitcases"
};

function translateTextNodes(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, noscript, svg, .sr-only')) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const original = originalText.get(node) ?? node.nodeValue;
    if (!originalText.has(node)) originalText.set(node, original);
    const lead = original.match(/^\s*/)[0];
    const trail = original.match(/\s*$/)[0];
    const value = original.trim();
    node.nodeValue = lead + (language === 'en' ? (englishCopy[value] || value) : value) + trail;
  });
}

const originalAttributes = new WeakMap();

function translateAttributes(language) {
  document.querySelectorAll('[aria-label], [alt], [placeholder]').forEach((element) => {
    const saved = originalAttributes.get(element) || {};
    ['aria-label', 'alt', 'placeholder'].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (!current) return;
      if (!(attribute in saved)) saved[attribute] = current;
      const original = saved[attribute];
      element.setAttribute(attribute, language === 'en' ? (translatableAttributes[original] || original) : original);
    });
    originalAttributes.set(element, saved);
  });
}

function setLanguage(language) {
  const active = language === 'en' ? 'en' : 'es';
  translateTextNodes(active);
  translateAttributes(active);
  document.documentElement.lang = active;
  document.title = active === 'en' ? 'Buenos Aires Transfers | Airport and private chauffeur' : 'Traslados Buenos Aires | Ezeiza, Aeroparque y chofer privado';
  languageButtons.forEach((button) => {
    const selected = button.dataset.language === active;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
setLanguage('es');


// Quote form: carry the trip details straight into WhatsApp.
const bookingQuote = document.querySelector('.booking-quote');
if (bookingQuote) {
  bookingQuote.addEventListener('click', () => {
    const language = document.documentElement.lang === 'en' ? 'en' : 'es';
    const values = {};
    document.querySelectorAll('[data-booking-field]').forEach((field) => {
      values[field.dataset.bookingField] = field.value.trim() || (language === 'en' ? 'To be confirmed' : 'A confirmar');
    });
    const message = language === 'en'
      ? `Hello, I would like a transfer quote.\n\nTrip type: ${values['Tipo de viaje']}\nOrigin: ${values['Origen']}\nDestination: ${values['Destino']}\nDate: ${values['Fecha']}\nPassengers and luggage: ${values['Pasajeros y equipaje']}`
      : `Hola, quiero cotizar un traslado.\n\nTipo de viaje: ${values['Tipo de viaje']}\nOrigen: ${values['Origen']}\nDestino: ${values['Destino']}\nFecha: ${values['Fecha']}\nPasajeros y equipaje: ${values['Pasajeros y equipaje']}`;
    bookingQuote.href = `https://wa.me/5491127961111?text=${encodeURIComponent(message)}`;
  });
}


// Every fresh load starts at the beginning instead of restoring a previous scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
