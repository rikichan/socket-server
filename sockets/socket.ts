import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// Conectar cliente
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}


// Desconexión de usuario
export const desconectar = (cliente: Socket, io: socketIO.Server
) => {
    cliente.on('disconnect', () => {
        console.log(`Cliente ${cliente.id} desconectado`);

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());

    });
}

// Escuchar-enviar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // 'mensaje' es el mismo nombre que emit en el event de angular this.socket.emit(event, payload, callback); event='mensaje
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });
}

// Configurar usuario
export const confUser = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });
}

// Obtener usuarios activos
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        // utilizando elmismo cliente para emitir 
        //cliente.emit('usuarios-activos', usuariosConectados.getLista());

        // Emite a todos
        // io.emit('usuarios-activos', usuariosConectados.getLista());

        // Emite solo a la persona que acaba de entrar
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());

    });
}