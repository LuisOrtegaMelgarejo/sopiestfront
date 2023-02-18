export interface ReporteCertificado {
  anno: number;
  detalle: Detalle[];
}
export interface Detalle {
  mes: string;
  detalle: any[];
}