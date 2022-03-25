import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions  } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Product A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product B' }
  ];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Tiempo', 'Calificacion', 'Ventas', 'Clientes Nuevos', 'Devoluciones'];
  
  public radarChartData: ChartDataSets[] = [
    { data: [62, 59, 80, 51, 56], label: 'Mes Actual' },
    { data: [30, 48, 50, 29, 80], label: 'Mes Pasado' }
  ];
  public radarChartType: ChartType = 'radar';


  titulo;

  constructor( private usuarioService:UsuarioService ) { }

  ngOnInit(): void {
    this.identiRol()
    console.log(this.usuarioService.role)
  }

  identiRol(){
    if(this.usuarioService.role === 'ADMIN_ROLE'){
      console.log('Admin');
      this.titulo = "Como Administrador"
    }else if(this.usuarioService.role === 'USER_ROLE'){
      this.titulo = "Como Usuario"
      console.log('User');
    }
  }

  chartType = 'line';

  chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }



}
