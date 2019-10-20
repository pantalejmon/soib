const { ipcRenderer } = require('electron');
const Chart = require('chart.js');
require('chartjs-plugin-zoom');
// const TabGroup = require("electron-tabs");

interface DataPack {
    linespace: Array<number>;
    dmArray: Array<number>;
}
let data: DataPack = {
    linespace: [],
    dmArray: []
};


ipcRenderer.send('selectMaterial', 'SiO2');

// let tabGroup = new TabGroup();
// let tab = tabGroup.addTab({
//     title: "SiO2",
//     src: "http://electron.atom.io",
//     visible: true
// });
// let tab1 = tabGroup.addTab({
//     title: "SiO2GiO2",
//     src: "http://google.com",
//     visible: true
// });
function getDataSi() {
    ipcRenderer.send('selectMaterial', 'SiO2');
    console.log("Wysłalem dane")
}
function getDataSiO() {
    ipcRenderer.send('selectMaterial', 'SiO2GiO2');
    console.log("Wysłalem dane")
}
function getDataGe() {
    ipcRenderer.send('selectMaterial', 'GeO2');
    console.log("Wysłalem dane")
}
function getDataAl() {
    ipcRenderer.send('selectMaterial', 'Al2O3');
    console.log("Wysłalem dane")
}
function getDataZr() {
    ipcRenderer.send('selectMaterial', 'ZrO2');
    console.log("Wysłalem dane")
}




// ipcRenderer.send('selectMaterial', 'SiO2');
ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
    data = arg;
    console.log(arg);
    console.log(data.linespace);
    console.log(data.dmArray);
    var ctx: any = document.getElementById('myChart');
    if (ctx) {
        var myLineChart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: data.linespace,// [0.25, 0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25],
                datasets: [{
                    data: data.dmArray,
                    label: "Dyspersja",
                    borderColor: "#3e95cd",
                    fill: false
                }]
            }, options: {
                title: {
                    display: true,
                    text: 'Wykres z soib'
                },
                responsive: true,


                // Container for zoom options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                }
            }


        });
    }
})

// ipcRenderer.send('selectMaterial', 'SiO2GiO2');
// console.log("Wysłalem dane")
// ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
//     data[1] = arg;
//     console.log(arg);
//     console.log(data[1].linespace);
//     console.log(data[1].dmArray);
//     var ctx: any = document.getElementById('myChart2');
//     if (ctx) {
//         var myLineChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: data[1].linespace,
//                 datasets: [{
//                     data: data[1].dmArray,
//                     label: "Dyspersja",
//                     borderColor: "#3e95cd",
//                     fill: false
//                 }]
//             }, options: {
//                 title: {
//                     display: true,
//                     text: 'Wykres z soib'
//                 }
//             }
//         });
//     }  
// })
// ipcRenderer.send('selectMaterial', 'GeO2');
// console.log("Wysłalem dane")
// ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
//     data[2] = arg;
//     console.log(arg);
//     console.log(data[2].linespace);
//     console.log(data[2].dmArray);
//     var ctx: any = document.getElementById('myChart3');
//     if (ctx) {
//         var myLineChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: data[2].linespace,
//                 datasets: [{
//                     data: data[2].dmArray,
//                     label: "Dyspersja",
//                     borderColor: "#3e95cd",
//                     fill: false
//                 }]
//             }, options: {
//                 title: {
//                     display: true,
//                     text: 'Wykres z soib'
//                 }
//             }
//         });
//     }  
// })
// ipcRenderer.send('selectMaterial', 'Al2O3');
// console.log("Wysłalem dane")
// ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
//     data[3] = arg;

//     console.log(data[3].linespace);
//     console.log(data[3].dmArray);
//     console.log(arg);
//     var ctx: any = document.getElementById('myChart4');
//     if (ctx) {
//         var myLineChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: data[3].linespace,
//                 datasets: [{
//                     data: data[3].dmArray,
//                     label: "Dyspersja",
//                     borderColor: "#3e95cd",
//                     fill: false
//                 }]
//             }, options: {
//                 title: {
//                     display: true,
//                     text: 'Wykres z soib'
//                 }
//             }
//         });
//     }  
// })
// ipcRenderer.send('selectMaterial', 'ZrO2');
// console.log("Wysłalem dane")
// ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
//     data[4] = arg;

//     console.log(data[4].linespace);
//     console.log(data[4].dmArray);
//     console.log(arg);
//     var ctx: any = document.getElementById('myChart5');
//     if (ctx) {
//         var myLineChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: data[4].linespace,
//                 datasets: [{
//                     data: data[4].dmArray,
//                     label: "Dyspersja",
//                     borderColor: "#3e95cd",
//                     fill: false
//                 }]
//             }, options: {
//                 title: {
//                     display: true,
//                     text: 'Wykres z soib'
//                 }
//             }
//         });
//     }  
// })

//API