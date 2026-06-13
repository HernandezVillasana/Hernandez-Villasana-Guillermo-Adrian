    /*
    Vamos atener unsa estructura mrdiante la cual implementamos el modelo vista controlqdor, en donde a partir del uso de una API podemos consumir los elemtos por oa¿parte del front para obtener sus datos como peticion o como respuest adel back
    */
    console.log("APP CARGADA");
    const apiMetodo = document.getElementById('api-metodo');
    const apiURL = document.getElementById('api-url');
    const apiCodigo = document.getElementById('api-codigo');
    const notificacionDIV = document.getElementById('notificacion');
    const isLocalFile = location.protocol === 'file:';
    const localDataKey = 'crudmvc-local-data';
    const initialData = {
        pilotos: [
            { id: 1, nombre: 'Max Verstappen', equipo: 'Red Bull', pais: 'Países Bajos', numero: 1 },
            { id: 2, nombre: 'Lewis Hamilton', equipo: 'Mercedes', pais: 'Reino Unido', numero: 44 },
            { id: 3, nombre: 'Charles Leclerc', equipo: 'Ferrari', pais: 'Mónaco', numero: 16 }
        ],
        escuderias: [
            { id: 1, nombre: 'Red Bull', pais: 'Austria', motor: 'Honda', titulos: 7 },
            { id: 2, nombre: 'Mercedes', pais: 'Alemania', motor: 'Mercedes', titulos: 8 },
            { id: 3, nombre: 'Ferrari', pais: 'Italia', motor: 'Ferrari', titulos: 16 }
        ],
        campeones: [
            { id: 1, anio: 2023, piloto: 'Max Verstappen', escuderia: 'Red Bull', puntos: 454 },
            { id: 2, anio: 2020, piloto: 'Lewis Hamilton', escuderia: 'Mercedes', puntos: 347 },
            { id: 3, anio: 2022, piloto: 'Max Verstappen', escuderia: 'Red Bull', puntos: 454 }
        ],
        usuarios: [
            { id: 1, nombre: 'Admin', email: 'admin@example.com' },
            { id: 2, nombre: 'Invitado', email: 'invitado@example.com' }
        ]
    };

    function loadLocalData() {
        try {
            const saved = localStorage.getItem(localDataKey);
            if (!saved) {
                localStorage.setItem(localDataKey, JSON.stringify(initialData));
                return JSON.parse(JSON.stringify(initialData));
            }
            return JSON.parse(saved);
        } catch (error) {
            localStorage.setItem(localDataKey, JSON.stringify(initialData));
            return JSON.parse(JSON.stringify(initialData));
        }
    }

    function saveLocalData(data) {
        localStorage.setItem(localDataKey, JSON.stringify(data));
    }

    function getCollectionFromUrl(url) {
        const path = url.replace(/^\/+/, '').split('?')[0].split('/');
        if (path[0] !== 'api') return null;
        return {
            resource: path[1],
            id: path[2] ? Number(path[2]) : null
        };
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    const localData = loadLocalData();

    async function localFetch(url, opciones = {}) {
        const route = getCollectionFromUrl(url);
        if (!route) {
            return { status: 'error', message: 'Ruta no encontrada' };
        }

        const { resource, id } = route;
        const method = (opciones.method || 'GET').toUpperCase();

        if (resource === 'api' && !id) {
            return {
                status: 'success',
                message: 'Bienvenido a la API local',
                endpoints: {
                    pilotos: 'GET/api/pilotos',
                    campeones: 'GET/api/campeones',
                    escuderias: 'GET/api/escuderias',
                    usuarios: 'GET/api/usuarios'
                }
            };
        }

        const collection = localData[resource];
        if (!collection) {
            return { status: 'error', message: 'Ruta no encontrada' };
        }

        if (method === 'GET') {
            if (id) {
                const item = collection.find(item => item.id === id);
                return item ? clone(item) : { status: 'error', message: 'Elemento no encontrado' };
            }
            return { status: 'success', data: clone(collection) };
        }

        const body = opciones.body ? JSON.parse(opciones.body) : {};

        if (method === 'POST') {
            const nextId = collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1;
            const newItem = { id: nextId, ...body };
            collection.push(newItem);
            saveLocalData(localData);
            return { status: 'success', message: 'Elemento creado', data: clone(newItem) };
        }

        if (method === 'PUT') {
            if (!id) return { status: 'error', message: 'ID es requerido' };
            const index = collection.findIndex(item => item.id === id);
            if (index === -1) return { status: 'error', message: 'Elemento no encontrado' };
            collection[index] = { ...collection[index], ...body };
            saveLocalData(localData);
            return { status: 'success', message: 'Elemento actualizado', data: clone(collection[index]) };
        }

        if (method === 'DELETE') {
            if (!id) return { status: 'error', message: 'ID es requerido' };
            const index = collection.findIndex(item => item.id === id);
            if (index === -1) return { status: 'error', message: 'Elemento no encontrado' };
            collection.splice(index, 1);
            saveLocalData(localData);
            return { status: 'success', message: 'Elemento eliminado' };
        }

        return { status: 'error', message: 'Método no soportado' };
    }

    // Quitar acentos/diacríticos
    function stripAccents(str) {
        if (!str) return str;
        return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    async function cargarSelectsPilotos() {
        try {
            const res = await FetchAPI('/api/pilotos');
            const nombre = document.getElementById('piloto-nombre');
            const equipo = document.getElementById('piloto-equipo');
            const pais = document.getElementById('piloto-pais');

            nombre.innerHTML = '<option value="">Selecciona un piloto</option>';
            equipo.innerHTML = '<option value="">Selecciona un equipo</option>';
            pais.innerHTML = '<option value="">Selecciona un pais</option>';

            const equipos = [...new Set(res.data.map(p => p.equipo))];
            equipos.forEach(eq => {
                equipo.innerHTML += `<option value="${stripAccents(eq)}">${stripAccents(eq)}</option>`;
            });

            const paises = [...new Set(res.data.map(p => p.pais))];
            paises.forEach(p => {
                pais.innerHTML += `<option value="${stripAccents(p)}">${stripAccents(p)}</option>`;
            });

            const numeros = [...new Set(res.data.map(p => p.numero))];
            const numero = document.getElementById('piloto-numero');
            if (numero) {
                numero.innerHTML = '<option value="">Selecciona un numero</option>';
                numeros.forEach(n => {
                    numero.innerHTML += `<option value="${n}">${n}</option>`;
                });
            }
            res.data.forEach(p => {
                const san = Object.assign({}, p, {
                    nombre: stripAccents(p.nombre),
                    equipo: stripAccents(p.equipo),
                    pais: stripAccents(p.pais)
                });
                nombre.innerHTML += `
                    <option value="${stripAccents(p.nombre)}" data-piloto='${encodeURIComponent(JSON.stringify(san))}'>
                        ${stripAccents(p.nombre)}
                    </option>
                `;
            });

            nombre.addEventListener('change', mostrarPilotoSeleccionado);
            equipo.addEventListener('change', filtrarPilotosPorEquipo);
            pais.addEventListener('change', filtrarPilotosPorPais);
        } catch (error) {
            console.error('Error al cargar selects de pilotos:', error);
        }
    }

    
    function mostrarPilotoSeleccionado(e) {
        const selected = e.target.options[e.target.selectedIndex];
        const datos = selected.dataset.piloto;
        
        if (datos) {
            const piloto = JSON.parse(decodeURIComponent(datos));
            mostrarDetallesPiloto(piloto);
        }
    }

    function mostrarDetallesPiloto(piloto) {
        const tbody = document.getElementById('tbody-pilotos');
        tbody.innerHTML = `
            <tr style="background-color: #e3f2fd;">
                <td>${piloto.id}</td>
                <td>${stripAccents(piloto.nombre)}</td>
                <td>${stripAccents(piloto.equipo)}</td>
                <td>${stripAccents(piloto.pais)}</td>
                <td>${piloto.numero}</td>
                <td>
                    <button onclick="eliminarPiloto(${piloto.id})">Eliminar</button>
                    <button onclick="editarPiloto(${piloto.id})">Editar</button>
                </td>
            </tr>
        `;
    }


    async function filtrarPilotosPorEquipo(e) {
        const equipo = e.target.value;
        if (!equipo) {
            await cargarPilotos();
            return;
        }

        try {
            const res = await FetchAPI('/api/pilotos');
            const pilotosFiltrados = res.data.filter(p => stripAccents(p.equipo) === stripAccents(equipo));
            const tbody = document.getElementById('tbody-pilotos');
            tbody.innerHTML = '';

            pilotosFiltrados.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${stripAccents(p.nombre)}</td>
                        <td>${stripAccents(p.equipo)}</td>
                        <td>${stripAccents(p.pais)}</td>
                        <td>${p.numero}</td>
                        <td>
                            <button onclick="eliminarPiloto(${p.id})">Eliminar</button>
                            <button onclick="editarPiloto(${p.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar pilotos:', error);
        }
    }

    async function filtrarPilotosPorPais(e) {
        const pais = e.target.value;
        if (!pais) {
            await cargarPilotos();
            return;
        }

        try {
            const res = await FetchAPI('/api/pilotos');
            const pilotosFiltrados = res.data.filter(p => stripAccents(p.pais) === stripAccents(pais));
            const tbody = document.getElementById('tbody-pilotos');
            tbody.innerHTML = '';

            pilotosFiltrados.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.equipo}</td>
                        <td>${p.pais}</td>
                        <td>${p.numero}</td>
                        <td>
                            <button onclick="eliminarPiloto(${p.id})">Eliminar</button>
                            <button onclick="editarPiloto(${p.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar pilotos:', error);
        }
    }

    async function FetchAPI(url, opciones = {}) {
        const method = opciones.method || 'GET';
        apiMetodo.textContent = method;
        apiMetodo.className = `badge badge-${method.toLowerCase()}`;
        apiURL.textContent = url;
        apiCodigo.textContent = 'Cargando...';
        apiCodigo.className = 'badge badge-secondary';

        if (isLocalFile && url.startsWith('/api')) {
            const datos = await localFetch(url, opciones);
            apiCodigo.textContent = '200';
            apiCodigo.className = 'badge badge-success';
            return datos;
        }

        try {
            const response = await fetch(url, opciones);
            apiCodigo.textContent = `${response.status}`;
            apiCodigo.className = `badge badge-${response.ok ? 'badge-success' : 'badge-danger'}`;
            const datos = await response.json();
            if (!response.ok) {
                throw new Error(datos.message || 'Error en la solicitud');
            }
            return datos;
        } catch (error) {
            if (url.startsWith('/api')) {
                const datos = await localFetch(url, opciones);
                apiCodigo.textContent = '200';
                apiCodigo.className = 'badge badge-success';
                return datos;
            }
            if (apiCodigo.textContent === 'Cargando...') {
                apiCodigo.textContent = 'Error';
                apiCodigo.className = 'badge badge-danger';
            }
            throw error;
        }
    }
    function mostrarError(msg) {
        document.getElementById("mensaje-error").textContent = msg;
    }

    
    const formUsuarios = document.getElementById('form-usuarios');
    const inputUsuarioId = document.getElementById('usuario-id');
    const inputUsuarioNombre = document.getElementById('usuario-nombre');
    const inputUsuarioEmail = document.getElementById('usuario-email');
    const TituloUsuarios = document.getElementById('form-titulo-usuarios');
    const btnGuardarUsuario = document.getElementById('btn-guardar-usuario');
    const btnCancelarUsuario = document.getElementById('btn-cancelar-usuario');
    const tbodyUsuarios = document.getElementById('tbody-usuarios');
    const tableUsuarios = document.getElementById('table-usuarios');
    const cargaUsuarios = document.getElementById('carga-usuarios');
    const contadorUsuarios = document.getElementById('contador-usuarios');
    const errorUsuarios = document.getElementById('error-usuarios');
    const errorUsuarioEmail = document.getElementById('error-usuario-email');

    async function cargarUsuarios() {
        try {
            const respuesta = await FetchAPI('/api/usuarios');

            errorUsuarios.style.display = 'none';
            tbodyUsuarios.innerHTML = '';

            if (!respuesta.data || respuesta.data.length === 0) {
                errorUsuarios.textContent = 'No hay usuarios registrados';
                errorUsuarios.style.display = 'block';
                tableUsuarios.style.display = 'none';
                contadorUsuarios.textContent = '0';
                return;
            }

            tableUsuarios.style.display = 'table';

            respuesta.data.forEach(u => {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${u.id}</td>
                    <td>${u.nombre}</td>
                    <td>${u.email}</td>
                    <td>
                        <button onclick="editarUsuario(${u.id})">Editar</button>
                        <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
                    </td>
                `;

                tbodyUsuarios.appendChild(fila);
            });

            contadorUsuarios.textContent = respuesta.data.length;

        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            errorUsuarios.textContent = 'Error al cargar usuarios';
            errorUsuarios.style.display = 'block';
            tableUsuarios.style.display = 'none';
            contadorUsuarios.textContent = '0';
        }
    }

    async function guardarUsuario(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const id = inputUsuarioId.value;
        const nombre = inputUsuarioNombre.value.trim();
        const email = inputUsuarioEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre || !email || !emailRegex.test(email)) {
            errorUsuarios.textContent = 'Nombre y email válidos son obligatorios';
            errorUsuarios.style.display = 'block';
            return;
        }

        const payload = { nombre, email };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/usuarios/${id}` : '/api/usuarios';

        await FetchAPI(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        inputUsuarioId.value = '';
        formUsuarios.reset();
        btnCancelarUsuario.style.display = 'none';
        await cargarUsuarios();
    }

    async function editarUsuario(id) {
        try {
            const respuesta = await FetchAPI('/api/usuarios');
            const usuario = respuesta.data.find(u => u.id == id);
            if (!usuario) return;

            inputUsuarioId.value = usuario.id;
            inputUsuarioNombre.value = usuario.nombre;
            inputUsuarioEmail.value = usuario.email;
            btnCancelarUsuario.style.display = 'inline-block';
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    }

    async function eliminarUsuario(id) {
        const confirmacion = confirm('¿Seguro que quieres eliminar este usuario?');
        if (!confirmacion) return;

        try {
            await FetchAPI(`/api/usuarios/${id}`, { method: 'DELETE' });
            await cargarUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    }

    function cancelarUsuario() {
        formUsuarios.reset();
        inputUsuarioId.value = '';
        btnCancelarUsuario.style.display = 'none';
        errorUsuarios.style.display = 'none';
    }

    async function cambiarSeccion(seccion) {
        document.querySelectorAll('.seccion').forEach(s => {
            s.style.display = 'none';
        });

        document.getElementById(`seccion-${seccion}`).style.display = 'block';

        if (seccion === 'pilotos') {
            cargarSelectsPilotos();
            cargarPilotos();
        }
        if (seccion === 'campeones') {
            cargarSelectsCampeones();
            cargarCampeones();
        }
        if (seccion === 'escuderias') {
            cargarSelectsEscuderias();
            cargarEscuderias();
        }
        if (seccion === 'usuarios') {
            await cargarUsuarios();
        }
    }
    async function cargarPilotos() {
    
        const res = await FetchAPI('/api/pilotos');

        const tbody = document.getElementById('tbody-pilotos');
        tbody.innerHTML = '';

            res.data.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${stripAccents(p.nombre)}</td>
                        <td>${stripAccents(p.equipo)}</td>
                        <td>${stripAccents(p.pais)}</td>
                        <td>${p.numero}</td>
                        <td>
                            <button onclick="eliminarPiloto(${p.id})">Eliminar</button>
                            <button onclick="editarPiloto(${p.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
    }

    async function cargarSelectsCampeones() {
        try {
            const resPilotos = await FetchAPI('/api/pilotos');
            const resCampeones = await FetchAPI('/api/campeones');
            const resEscuderias = await FetchAPI('/api/escuderias');

            const selectPiloto = document.getElementById('campeon-piloto');
            const selectEscuderia = document.getElementById('campeon-escuderia');
            const selectAnio = document.getElementById('campeon-anio');
            const selectPuntos = document.getElementById('campeon-puntos');

            selectPiloto.innerHTML = '<option value="">Selecciona un piloto</option>';
            selectEscuderia.innerHTML = '<option value="">Selecciona una escuderia</option>';
            selectAnio.innerHTML = '<option value="">Selecciona un ano</option>';
            selectPuntos.innerHTML = '<option value="">Selecciona puntos</option>';

            resPilotos.data.forEach(p => {
                selectPiloto.innerHTML += `<option value="${stripAccents(p.nombre)}">${stripAccents(p.nombre)}</option>`;
            });

            resEscuderias.data.forEach(e => {
                selectEscuderia.innerHTML += `<option value="${stripAccents(e.nombre)}">${stripAccents(e.nombre)}</option>`;
            });

            const anos = [...new Set(resCampeones.data.map(c => c.anio))];
            const puntos = [...new Set(resCampeones.data.map(c => c.puntos))];

            anos.forEach(a => {
                selectAnio.innerHTML += `<option value="${a}">${a}</option>`;
            });

            puntos.forEach(p => {
                selectPuntos.innerHTML += `<option value="${p}">${p}</option>`;
            });

  
            selectPiloto.addEventListener('change', filtrarCampeonPorPiloto);
            selectEscuderia.addEventListener('change', filtrarCampeonPorEscuderia);
            selectAnio.addEventListener('change', filtrarCampeonPorAnio);
        } catch (error) {
            console.error('Error al cargar selects de campeones:', error);
        }
    }

    async function filtrarCampeonPorPiloto(e) {
        const piloto = e.target.value;
        if (!piloto) {
            await cargarCampeones();
            return;
        }

        try {
            const res = await FetchAPI('/api/campeones');
            const campeonFiltrado = res.data.filter(c => stripAccents(c.piloto) === stripAccents(piloto));
            const tbody = document.getElementById('tbody-campeones');
            tbody.innerHTML = '';

            campeonFiltrado.forEach(c => {
                tbody.innerHTML += `
                    <tr style="background-color: #c8e6c9;">
                        <td>${c.id}</td>
                        <td>${c.anio}</td>
                        <td>${c.piloto}</td>
                        <td>${c.escuderia}</td>
                        <td>${c.puntos}</td>
                        <td>
                            
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar campeón:', error);
        }
    }

    async function filtrarCampeonPorEscuderia(e) {
        const escuderia = e.target.value;
        if (!escuderia) {
            await cargarCampeones();
            return;
        }

        try {
            const res = await FetchAPI('/api/campeones');
            const campeonFiltrado = res.data.filter(c => stripAccents(c.escuderia) === stripAccents(escuderia));
            const tbody = document.getElementById('tbody-campeones');
            tbody.innerHTML = '';

            campeonFiltrado.forEach(c => {
                tbody.innerHTML += `
                    <tr style="background-color: #c8e6c9;">
                        <td>${c.id}</td>
                        <td>${c.anio}</td>
                        <td>${c.piloto}</td>
                        <td>${c.escuderia}</td>
                        <td>${c.puntos}</td>
                        <td>
                            
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar campeón:', error);
        }
    }

    async function filtrarCampeonPorAnio(e) {
        const anio = e.target.value;
        if (!anio) {
            await cargarCampeones();
            return;
        }

        try {
            const res = await FetchAPI('/api/campeones');
            const campeonFiltrado = res.data.filter(c => c.anio == anio);
            const tbody = document.getElementById('tbody-campeones');
            tbody.innerHTML = '';

            campeonFiltrado.forEach(c => {
                tbody.innerHTML += `
                    <tr style="background-color: #c8e6c9;">
                        <td>${c.id}</td>
                        <td>${c.anio}</td>
                        <td>${c.piloto}</td>
                        <td>${c.escuderia}</td>
                        <td>${c.puntos}</td>
                        <td>
                                <button onclick="eliminarCampeon(${c.id})">Eliminar</button>
                                <button onclick="editarCampeon(${c.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar campeón:', error);
        }
    }

    async function cargarSelectsEscuderias() {
        try {
            const res = await FetchAPI('/api/escuderias');
            const selectNombre = document.getElementById('escuderia-nombre');
            const selectPais = document.getElementById('escuderia-pais');
            const selectMotor = document.getElementById('escuderia-motor');
            const selectTitulos = document.getElementById('escuderia-titulos');

            selectNombre.innerHTML = '<option value="">Selecciona una escuderia</option>';
            selectPais.innerHTML = '<option value="">Selecciona un pais</option>';
            selectMotor.innerHTML = '<option value="">Selecciona un motor</option>';
            if (selectTitulos) selectTitulos.innerHTML = '<option value="">Selecciona los titulos</option>';

            const paises = [...new Set(res.data.map(e => e.pais))];
            const motores = [...new Set(res.data.map(e => e.motor))];

            paises.forEach(p => {
                selectPais.innerHTML += `<option value="${stripAccents(p)}">${stripAccents(p)}</option>`;
            });

            motores.forEach(m => {
                selectMotor.innerHTML += `<option value="${stripAccents(m)}">${stripAccents(m)}</option>`;
            });

            const titulos = [...new Set(res.data.map(e => e.titulos))];
            if (selectTitulos) {
                titulos.forEach(t => {
                    selectTitulos.innerHTML += `<option value="${t}">${t}</option>`;
                });
            }

           
            res.data.forEach(e => {
                const sanE = Object.assign({}, e, {
                    nombre: stripAccents(e.nombre),
                    pais: stripAccents(e.pais),
                    motor: stripAccents(e.motor)
                });
                selectNombre.innerHTML += `
                    <option value="${stripAccents(e.nombre)}" data-escuderia='${encodeURIComponent(JSON.stringify(sanE))}'>
                        ${stripAccents(e.nombre)}
                    </option>
                `;
            });

            selectNombre.addEventListener('change', mostrarEscuderiaSeleccionada);
            selectPais.addEventListener('change', filtrarEscuderiasPorPais);
            selectMotor.addEventListener('change', filtrarEscuderiasPorMotor);
            if (selectTitulos) selectTitulos.addEventListener('change', filtrarEscuderiasPorTitulos);
        } catch (error) {
            console.error('Error al cargar selects de escuderías:', error);
        }
    }

    function mostrarEscuderiaSeleccionada(e) {
        const selected = e.target.options[e.target.selectedIndex];
        const datos = selected.dataset.escuderia;
        
        if (datos) {
            const escuderia = JSON.parse(decodeURIComponent(datos));
            mostrarDetallesEscuderia(escuderia);
        }
    }

    function mostrarDetallesEscuderia(escuderia) {
        const tbody = document.getElementById('tbody-escuderias');
        tbody.innerHTML = `
            <tr style="background-color: #fff9c4;">
                <td>${escuderia.id}</td>
                <td>${stripAccents(escuderia.nombre)}</td>
                <td>${stripAccents(escuderia.pais)}</td>
                <td>${stripAccents(escuderia.motor)}</td>
                <td>${escuderia.titulos}</td>
                <td>
                    <button onclick="eliminarEscuderia(${escuderia.id})">Eliminar</button>
                    <button onclick="editarEscuderia(${escuderia.id})">Editar</button>
                </td>
            </tr>
        `;
    }

    async function filtrarEscuderiasPorPais(e) {
        const pais = e.target.value;
        if (!pais) {
            await cargarEscuderias();
            return;
        }

        try {
            const res = await FetchAPI('/api/escuderias');
            const escuderiasFiltradas = res.data.filter(e => stripAccents(e.pais) === stripAccents(pais));
            const tbody = document.getElementById('tbody-escuderias');
            tbody.innerHTML = '';

            escuderiasFiltradas.forEach(e => {
                tbody.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${stripAccents(e.nombre)}</td>
                        <td>${stripAccents(e.pais)}</td>
                        <td>${stripAccents(e.motor)}</td>
                        <td>${e.titulos}</td>
                        <td>
                            <button onclick="eliminarEscuderia(${e.id})">Eliminar</button>
                            <button onclick="editarEscuderia(${e.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar escuderías:', error);
        }
    }

    async function filtrarEscuderiasPorMotor(e) {
        const motor = e.target.value;
        if (!motor) {
            await cargarEscuderias();
            return;
        }

        try {
            const res = await FetchAPI('/api/escuderias');
            const escuderiasFiltradas = res.data.filter(e => stripAccents(e.motor) === stripAccents(motor));
            const tbody = document.getElementById('tbody-escuderias');
            tbody.innerHTML = '';

            escuderiasFiltradas.forEach(e => {
                tbody.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.pais}</td>
                        <td>${e.motor}</td>
                        <td>${e.titulos}</td>
                        <td>
                            
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar escuderías:', error);
        }
    }

    async function filtrarEscuderiasPorTitulos(e) {
        const titulos = e.target.value;
        if (!titulos) {
            await cargarEscuderias();
            return;
        }

        try {
            const res = await FetchAPI('/api/escuderias');
            const escuderiasFiltradas = res.data.filter(e => String(e.titulos) === titulos);
            const tbody = document.getElementById('tbody-escuderias');
            tbody.innerHTML = '';

            escuderiasFiltradas.forEach(e => {
                tbody.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.pais}</td>
                        <td>${e.motor}</td>
                        <td>${e.titulos}</td>
                        <td>
                            
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al filtrar escuderías por títulos:', error);
        }
    }

    async function guardarEscuderia() {
        const id = document.getElementById('escuderia-id') ? document.getElementById('escuderia-id').value : '';
        const nombre = (document.getElementById('escuderia-nombre').value || '').trim();
        const pais = (document.getElementById('escuderia-pais').value || '').trim();
        const motor = (document.getElementById('escuderia-motor').value || '').trim();
        const titulos = Number(document.getElementById('escuderia-titulos').value);

        if (!nombre || !pais || !motor || isNaN(titulos) || titulos <= 0) {
            alert('Por favor completa todos los campos correctamente (títulos debe ser mayor que 0)');
            return;
        }

        const payload = { nombre: stripAccents(nombre), pais: stripAccents(pais), motor: stripAccents(motor), titulos };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/escuderias/${id}` : '/api/escuderias';

        await FetchAPI(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (id) document.getElementById('escuderia-id').value = '';
        await cargarEscuderias();
    }

    async function editarEscuderia(id) {

        const res = await FetchAPI('/api/escuderias');
        const escuderia = res.data.find(e => e.id == id);

        document.getElementById('escuderia-id').value = escuderia.id;
        document.getElementById('escuderia-nombre').value = stripAccents(escuderia.nombre);
        document.getElementById('escuderia-pais').value = stripAccents(escuderia.pais);
        document.getElementById('escuderia-motor').value = stripAccents(escuderia.motor);
        document.getElementById('escuderia-titulos').value = escuderia.titulos;
    }
    async function guardarCampeon() {
        const id = document.getElementById('campeon-id') ? document.getElementById('campeon-id').value : '';
        const anio = Number(document.getElementById('campeon-anio').value);
        const piloto = (document.getElementById('campeon-piloto').value || '').trim();
        const escuderia = (document.getElementById('campeon-escuderia').value || '').trim();
        const puntos = Number(document.getElementById('campeon-puntos').value);

        // Validación de campos
        if (isNaN(anio) || anio <= 0 || !piloto || !escuderia || isNaN(puntos) || puntos <= 0) {
            alert('Por favor completa todos los campos correctamente (año > 0, puntos > 0)');
            return;
        }

        const payload = { anio, piloto: stripAccents(piloto), escuderia: stripAccents(escuderia), puntos };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/campeones/${id}` : '/api/campeones';

        await FetchAPI(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (id) document.getElementById('campeon-id').value = '';
        await cargarCampeones();
    }
    async function editarCampeon(id) {

        const res = await FetchAPI('/api/campeones');
        const campeon = res.data.find(c => c.id == id);

        document.getElementById('campeon-id').value = campeon.id;
        document.getElementById('campeon-anio').value = campeon.anio;
        document.getElementById('campeon-piloto').value = stripAccents(campeon.piloto);
        document.getElementById('campeon-escuderia').value = stripAccents(campeon.escuderia);
        document.getElementById('campeon-puntos').value = campeon.puntos;
    }
    async function editarPiloto(id) {

        const res = await FetchAPI('/api/pilotos');

        const piloto = res.data.find(p => p.id == id);

        document.getElementById('piloto-id').value = piloto.id;
        document.getElementById('piloto-nombre').value = stripAccents(piloto.nombre);
        document.getElementById('piloto-equipo').value = stripAccents(piloto.equipo);
        document.getElementById('piloto-pais').value = stripAccents(piloto.pais);
        document.getElementById('piloto-numero').value = piloto.numero;
    }

    async function guardarPiloto() {
        const id = document.getElementById('piloto-id') ? document.getElementById('piloto-id').value : '';
        const nombre = (document.getElementById('piloto-nombre').value || '').trim();
        const equipo = (document.getElementById('piloto-equipo').value || '').trim();
        const pais = (document.getElementById('piloto-pais').value || '').trim();
        const numero = Number(document.getElementById('piloto-numero').value);

        // Validación de campos
        if (!nombre || !equipo || !pais || isNaN(numero) || numero <= 0) {
            alert('Por favor completa todos los campos correctamente (número debe ser mayor que 0)');
            return;
        }

        const payload = { nombre: stripAccents(nombre), equipo: stripAccents(equipo), pais: stripAccents(pais), numero };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/pilotos/${id}` : '/api/pilotos';

        await FetchAPI(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (id) document.getElementById('piloto-id').value = '';
        await cargarPilotos();
    }
    async function eliminarCampeon(id) {
        const confirmacion = confirm('¿Seguro que quieres eliminar este campeón?');

        if (!confirmacion) return;

        try {
            await FetchAPI(`/api/campeones/${id}`, {
                method: 'DELETE'
            });

            await cargarCampeones();

        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
    async function eliminarPiloto(id) {
        const confirmacion = confirm('¿Seguro que quieres eliminar este piloto?');
        if (!confirmacion) return;

        await FetchAPI(`/api/pilotos/${id}`, {
            method: 'DELETE'
        });

        cargarPilotos();
    }
    async function eliminarEscuderia(id) {
        const confirmacion = confirm('¿Seguro que quieres eliminar esta escudería?');
        if (!confirmacion) return;

        await FetchAPI(`/api/escuderias/${id}`, {
            method: 'DELETE'
        });

        cargarEscuderias();
    }

    // Función para cargar todas las tablas al abrir la página
    async function cargarCampeones() {
        try {
            const res = await FetchAPI('/api/campeones');
            const tbody = document.getElementById('tbody-campeones');
            tbody.innerHTML = '';

            res.data.forEach(c => {
                tbody.innerHTML += `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.anio}</td>
                        <td>${stripAccents(c.piloto)}</td>
                        <td>${stripAccents(c.escuderia)}</td>
                        <td>${c.puntos}</td>
                        <td>
                            <button onclick="eliminarCampeon(${c.id})">Eliminar</button>
                            <button onclick="editarCampeon(${c.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al cargar campeones:', error);
        }
    }

    async function cargarEscuderias() {
        try {
            const res = await FetchAPI('/api/escuderias');
            const tbody = document.getElementById('tbody-escuderias');
            tbody.innerHTML = '';

            res.data.forEach(e => {
                tbody.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.pais}</td>
                        <td>${e.motor}</td>
                        <td>${e.titulos}</td>
                        <td>
                            <button onclick="eliminarEscuderia(${e.id})">Eliminar</button>
                            <button onclick="editarEscuderia(${e.id})">Editar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al cargar escuderías:', error);
        }
    }

    // Inicializar botones
    const btnGuardarPiloto = document.getElementById("btn-guardar-piloto");
    if (btnGuardarPiloto) {
        btnGuardarPiloto.addEventListener("click", guardarPiloto);
    }

    if (formUsuarios) {
        formUsuarios.addEventListener('submit', guardarUsuario);
    }
    if (btnCancelarUsuario) {
        btnCancelarUsuario.addEventListener('click', cancelarUsuario);
    }

    // Ventana global para funciones
    window.guardarPiloto = guardarPiloto;
    window.guardarCampeon = guardarCampeon;
    window.guardarEscuderia = guardarEscuderia;
    window.guardarUsuario = guardarUsuario;
    window.editarPiloto = editarPiloto;
    window.editarCampeon = editarCampeon;
    window.editarEscuderia = editarEscuderia;
    window.editarUsuario = editarUsuario;
    window.eliminarPiloto = eliminarPiloto;
    window.eliminarCampeon = eliminarCampeon;
    window.eliminarEscuderia = eliminarEscuderia;
    window.eliminarUsuario = eliminarUsuario;
    window.cancelarUsuario = cancelarUsuario;
    window.cambiarSeccion = cambiarSeccion;
    window.cargarPilotos = cargarPilotos;
    window.cargarCampeones = cargarCampeones;
    window.cargarEscuderias = cargarEscuderias;
    window.cargarUsuarios = cargarUsuarios;