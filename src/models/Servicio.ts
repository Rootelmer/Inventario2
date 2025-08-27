import mongoose, { Schema, Document } from 'mongoose';

export interface IServicio extends Document {
  nombreCliente: string;
  numeroCelular: string;
  fecha: Date;
  nombreEquipo: string;
  contrasenaEquipo?: string;
  accesorios?: string;
  descripcionProblema?: string;
  precioServicio: number;
}

const ServicioSchema = new Schema<IServicio>({
  nombreCliente: { type: String, required: true, trim: true },
  numeroCelular: { type: String, required: true, trim: true },
  fecha: { type: Date, required: true },
  nombreEquipo: { type: String, required: true, trim: true },
  contrasenaEquipo: { type: String, default: '' },
  accesorios: { type: String, default: '' },
  descripcionProblema: { type: String, default: '' },
  precioServicio: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model<IServicio>('Servicio', ServicioSchema);
