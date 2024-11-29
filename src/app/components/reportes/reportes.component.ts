import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { materialModules } from '../../models/material-imports';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [...materialModules, CommonModule, MatNativeDateModule, BaseChartDirective, ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class ReportesComponent implements OnInit {
  reporteForm: FormGroup;
  displayedColumns: string[] = ['sala', 'total_reservas'];
  dataSource: any[] = [];
  reporteSeleccionado: string = 'reservasPorSala';

  // Variables para el gráfico
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [], label: '' }
  ];

  constructor(private fb: FormBuilder, private reporteService: ReporteService) {
    this.reporteForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  ngOnInit(): void {}

  generarReporte(): void {
    const { fechaInicio, fechaFin } = this.reporteForm.value;
    const fechaInicioFormatted = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinFormatted = moment(fechaFin).format('YYYY-MM-DD');

    if (this.reporteSeleccionado === 'reservasPorSala') {
      this.reporteService.getReservasPorSala(fechaInicioFormatted, fechaFinFormatted).subscribe(
        (data) => {
          this.dataSource = data;
          this.displayedColumns = ['sala', 'total_reservas'];
          this.barChartLabels = data.map(item => item.sala);
          this.barChartData[0].data = data.map(item => item.total_reservas);
          this.barChartData[0].label = 'Total Reservas';
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
        }
      );
    } else if (this.reporteSeleccionado === 'reservasPorUsuario') {
      this.reporteService.getReservasPorUsuario(fechaInicioFormatted, fechaFinFormatted).subscribe(
        (data) => {
          this.dataSource = data;
          this.displayedColumns = ['usuario', 'total_reservas'];
          this.barChartLabels = data.map(item => item.usuario);
          this.barChartData[0].data = data.map(item => item.total_reservas);
          this.barChartData[0].label = 'Total Reservas';
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
        }
      );
    } else if (this.reporteSeleccionado === 'estadosReservas') {
      this.reporteService.getEstadosReservas(fechaInicioFormatted, fechaFinFormatted).subscribe(
        (data) => {
          this.dataSource = data;
          this.displayedColumns = ['estado_reserva', 'total_reservas'];
          this.barChartLabels = data.map(item => item.estado_reserva);
          this.barChartData[0].data = data.map(item => item.total_reservas);
          this.barChartData[0].label = 'Total Reservas';
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
        }
      );
    } else if (this.reporteSeleccionado === 'ingresosPorSala') {
      this.reporteService.getIngresosPorSala(fechaInicioFormatted, fechaFinFormatted).subscribe(
        (data) => {
          this.dataSource = data;
          this.displayedColumns = ['sala', 'ingresos'];
          this.barChartLabels = data.map(item => item.sala);
          this.barChartData[0].data = data.map(item => item.ingresos);
          this.barChartData[0].label = 'Ingresos';
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
        }
      );
    } else if (this.reporteSeleccionado === 'usoSalasPorUbicacion') {
      this.reporteService.getUsoSalasPorUbicacion(fechaInicioFormatted, fechaFinFormatted).subscribe(
        (data) => {
          this.dataSource = data;
          this.displayedColumns = ['ubicacion', 'total_reservas'];
          this.barChartLabels = data.map(item => item.ubicacion);
          this.barChartData[0].data = data.map(item => item.total_reservas);
          this.barChartData[0].label = 'Total Reservas';
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
        }
      );
    }
  }

  imprimirReporte(): void {
    window.print();
  }
}