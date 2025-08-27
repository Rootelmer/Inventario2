import mongoose, { Schema, Document } from 'mongoose';

export interface ISalida extends Document {
  numeroFactura: string;
  fecha: Date;
  cliente: string;
  producto: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  total: number;
}

const salidaSchema = new Schema<ISalida>({
  numeroFactura: { type: String, required: true },
  fecha: { type: Date, required: true },
  cliente: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  importe: { type: Number, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ISalida>('Salida', salidaSchema);
