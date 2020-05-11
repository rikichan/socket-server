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
export const desconectar = (cliente: Socket
) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        // console.log(`Cliente ${cliente.id} desconectado`);
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

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });
}