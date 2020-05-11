import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {

    }

    // Agregar un usuario
    public agregar(usuario: Usuario) {

        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }


    public actualizarNombre(id: string, nombre: string) {

        // por DB se hace de otra forma, consultar tabla-colección y demas procesos
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('===Actualizando usuario===');
        console.log(this.lista);
    }

    // Obtener lista de usuarios conectados
    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuario en una sala particular
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);
        // console.log(this.lista);
        return tempUsuario;
    }

}