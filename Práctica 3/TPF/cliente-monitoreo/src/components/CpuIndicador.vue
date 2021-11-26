<template>
    <div>
        <h4>Recibiendo datos de CPU desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaCpu()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option v-for="cliente of listado" v-bind:key="cliente.id_cliente">{{cliente.direccion_ip}}</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-danger">
                    <div class="card-header text-center bg-danger">
                        <h4>Uso de CPU:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_usage}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>CPU Libre:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_free}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Nro de cores:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_count}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>CPU Count</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Modelo CPU:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_model}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div id="container" class="mt-3"></div>
        <div id="container2" class="mt-5"></div>
    </div>
</template>
<script>
import io from 'socket.io-client';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);
export default {
    name: 'CpuIndicador',
    data(){
        return {
            equipo:'',
            valor_cpu_usage:null,
            valor_cpu_free:null,
            valor_cpu_count:null,
            valor_cpu_model:null,
            listado:[],
            direccion_ip:""
        }
    },
    methods:{
        capturaCpu(){
            const socket = io(this.equipo)
            socket.on('cpu-usage', (objeto) => {
                this.valor_cpu_usage = objeto.data.toFixed(2);
            }),
            socket.on('cpu-free', (objeto) => {
                this.valor_cpu_free = objeto.data.toFixed(2);
            }),
            socket.on('cpu-count', (objeto) => {
                this.valor_cpu_count = objeto.data;
            }),
            socket.on('cpu-model', (objeto) => {
                this.valor_cpu_model = objeto.data;
            })
            this.aplicar_tema()
            this.iniciar_grafico()
            this.aplicar_tema2()
            this.iniciar_grafico2()
        },
        listar_clientes(){
            this.axios.get("http://192.168.200.18:5000/clientes").then(result => {
                this.listado = result.data;
                this.direccion_ip = result.direccion_ip;
            })
        },
        iniciar_grafico(){
            const socket = io(this.equipo)
            Highcharts.chart('container', {
                chart: {
                    type: 'line',
                    animation: Highcharts.svg,
                    marginRight: 10,
                    events: {
                        load: function () {
                       
                            var series = this.series[0];
                            socket.on('cpu-usage', function(num){
                                var x = (new Date()).getTime();
                                console.log(num.data)
                                series.addPoint([x, num.data], true, true);
                            }); 
                        }
                    },
                    
                },
                time: {
                    useUTC: false
                },
                title: {
                    text: 'CPU Utilizado'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Uso CPU porcentual (%)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 100,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%'
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'CPU utilizado (%)',
                    data: (function () {
                       
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
                        for (i = -19; i <= 0; i += 1) {
                            var y = null;
                            socket.on('cpu-usage', function(num){
                                y = num.data;
                            })
                            data.push({
                                x: time + i * 1000,
                                y: y
                            });
                            
                        }
                        return data;
                    }())
                }]
            });
        },
        iniciar_grafico2(){
            const socket = io(this.equipo)
            Highcharts.chart('container2', {
                chart: {
                    type: 'line',
                    animation: Highcharts.svg,
                    marginRight: 10,
                    events: {
                        load: function () {
                       
                            var series = this.series[0];
                            socket.on('cpu-free', function(num){
                                var x = (new Date()).getTime();
                                console.log(num.data)
                                series.addPoint([x, num.data], true, true);
                            }); 
                        }
                    },
                    
                },
                time: {
                    useUTC: false
                },
                title: {
                    text: 'CPU Libre'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'CPU Libre porcentual (%)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 100,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%'
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'CPU Libre (%)',
                    data: (function () {
                       
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
                        for (i = -19; i <= 0; i += 1) {
                            var y = null;
                            socket.on('cpu-free', function(num){
                                y = num.data;
                            })
                            data.push({
                                x: time + i * 1000,
                                y: y
                            });
                            
                        }
                        return data;
                    }())
                }]
            });
        },
        aplicar_tema(){
            Highcharts.theme = {
                colors: ['#D9534F', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                    '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                chart: {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, '#0F2537'],
                            [1, '#0F2537']
                        ]
                    },
                    style: {
                        fontFamily: '\'Unica One\', sans-serif'
                    },
                    plotBorderColor: '#606063'
                },
                title: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase',
                        fontSize: '20px'
                    }
                },
                subtitle: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                    }
                },
                xAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    tickWidth: 1,
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: {
                        color: '#F0F0F0'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            color: '#F0F0F3',
                            style: {
                                fontSize: '13px'
                            }
                        },
                        marker: {
                            lineColor: '#333'
                        }
                    },
                    boxplot: {
                        fillColor: '#505053'
                    },
                    candlestick: {
                        lineColor: 'white'
                    },
                    errorbar: {
                        color: 'white'
                    }
                },
                legend: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    itemStyle: {
                        color: '#E0E0E3'
                    },
                    itemHoverStyle: {
                        color: '#FFF'
                    },
                    itemHiddenStyle: {
                        color: '#606063'
                    },
                    title: {
                        style: {
                            color: '#C0C0C0'
                        }
                    }
                },
                credits: {
                    style: {
                        color: '#666'
                    }
                },
                labels: {
                    style: {
                        color: '#707073'
                    }
                },
                drilldown: {
                    activeAxisLabelStyle: {
                        color: '#F0F0F3'
                    },
                    activeDataLabelStyle: {
                        color: '#F0F0F3'
                    }
                },
                navigation: {
                    buttonOptions: {
                        symbolStroke: '#DDDDDD',
                        theme: {
                            fill: '#505053'
                        }
                    }
                },
                // scroll charts
                rangeSelector: {
                    buttonTheme: {
                        fill: '#505053',
                        stroke: '#000000',
                        style: {
                            color: '#CCC'
                        },
                        states: {
                            hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            },
                            select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: '#505053',
                    inputStyle: {
                        backgroundColor: '#333',
                        color: 'silver'
                    },
                    labelStyle: {
                        color: 'silver'
                    }
                },
                navigator: {
                    handles: {
                        backgroundColor: '#666',
                        borderColor: '#AAA'
                    },
                    outlineColor: '#CCC',
                    maskFill: 'rgba(255,255,255,0.1)',
                    series: {
                        color: '#7798BF',
                        lineColor: '#A6C7ED'
                    },
                    xAxis: {
                        gridLineColor: '#505053'
                    }
                },
                scrollbar: {
                    barBackgroundColor: '#808083',
                    barBorderColor: '#808083',
                    buttonArrowColor: '#CCC',
                    buttonBackgroundColor: '#606063',
                    buttonBorderColor: '#606063',
                    rifleColor: '#FFF',
                    trackBackgroundColor: '#404043',
                    trackBorderColor: '#404043'
                }
            };
            // Apply the theme
            Highcharts.setOptions(Highcharts.theme);
        },
        aplicar_tema2(){
            Highcharts.theme = {
                colors: ['#5CB85C', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                    '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                chart: {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, '#0F2537'],
                            [1, '#0F2537']
                        ]
                    },
                    style: {
                        fontFamily: '\'Unica One\', sans-serif'
                    },
                    plotBorderColor: '#606063'
                },
                title: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase',
                        fontSize: '20px'
                    }
                },
                subtitle: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                    }
                },
                xAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    tickWidth: 1,
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: {
                        color: '#F0F0F0'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            color: '#F0F0F3',
                            style: {
                                fontSize: '13px'
                            }
                        },
                        marker: {
                            lineColor: '#333'
                        }
                    },
                    boxplot: {
                        fillColor: '#505053'
                    },
                    candlestick: {
                        lineColor: 'white'
                    },
                    errorbar: {
                        color: 'white'
                    }
                },
                legend: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    itemStyle: {
                        color: '#E0E0E3'
                    },
                    itemHoverStyle: {
                        color: '#FFF'
                    },
                    itemHiddenStyle: {
                        color: '#606063'
                    },
                    title: {
                        style: {
                            color: '#C0C0C0'
                        }
                    }
                },
                credits: {
                    style: {
                        color: '#666'
                    }
                },
                labels: {
                    style: {
                        color: '#707073'
                    }
                },
                drilldown: {
                    activeAxisLabelStyle: {
                        color: '#F0F0F3'
                    },
                    activeDataLabelStyle: {
                        color: '#F0F0F3'
                    }
                },
                navigation: {
                    buttonOptions: {
                        symbolStroke: '#DDDDDD',
                        theme: {
                            fill: '#505053'
                        }
                    }
                },
                // scroll charts
                rangeSelector: {
                    buttonTheme: {
                        fill: '#505053',
                        stroke: '#000000',
                        style: {
                            color: '#CCC'
                        },
                        states: {
                            hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            },
                            select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: '#505053',
                    inputStyle: {
                        backgroundColor: '#333',
                        color: 'silver'
                    },
                    labelStyle: {
                        color: 'silver'
                    }
                },
                navigator: {
                    handles: {
                        backgroundColor: '#666',
                        borderColor: '#AAA'
                    },
                    outlineColor: '#CCC',
                    maskFill: 'rgba(255,255,255,0.1)',
                    series: {
                        color: '#7798BF',
                        lineColor: '#A6C7ED'
                    },
                    xAxis: {
                        gridLineColor: '#505053'
                    }
                },
                scrollbar: {
                    barBackgroundColor: '#808083',
                    barBorderColor: '#808083',
                    buttonArrowColor: '#CCC',
                    buttonBackgroundColor: '#606063',
                    buttonBorderColor: '#606063',
                    rifleColor: '#FFF',
                    trackBackgroundColor: '#404043',
                    trackBorderColor: '#404043'
                }
            };
            // Apply the theme
            Highcharts.setOptions(Highcharts.theme);
        }
    },
    mounted(){
        this.capturaCpu()
        this.listar_clientes()
    }
}
</script>