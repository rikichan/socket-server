import { Socket } from 'socket.io';
import socketIO from 'socket.io';


// Desconexión
export const desconectar = (cliente: Socket
) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // 'mensaje es el mismo nombre que emit en el event de angular this.socket.emit(event, payload, callback); event='mensaje
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });
}