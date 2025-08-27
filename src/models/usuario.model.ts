/**import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    fechaCreacion: Date;
}

const UsuarioSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un correo válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['administrador', 'tecnico', 'ventas'],
        default: 'tecnico'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Método para eliminar el campo password al convertir a JSON
UsuarioSchema.methods.toJSON = function() {
    const usuario = this.toObject();
    delete usuario.password;
    return usuario;
};

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);**/