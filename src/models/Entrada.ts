import { Schema, model, Document } from 'mongoose';

export interface IEntrada extends Document {
  
  producto: Schema.Types.ObjectId;
  proveedor: Schema.Types.ObjectId;
  comprobante: string;
  existenciaInicial: number;
  existenciaActual: number;
  precioCompra: number;
  precioVenta: number;
  entradaPor: string;
  fechaEntrada: Date;
}

const entradaSchema = new Schema<IEntrada>({
  
  producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  comprobante: { type: String, required: true },
  existenciaInicial: { type: Number, required: true },
  existenciaActual: { type: Number, required: true },
  precioCompra: { type: Number, required: true },
  precioVenta: { type: Number, required: true },
  entradaPor: { type: String, required: true },
  fechaEntrada: { type: Date, required: true },
}, {
  timestamps: true
});

export default model<IEntrada>('Entrada', entradaSchema);
