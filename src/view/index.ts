const { ipcRenderer } = require('electron');

interface DataPack {
    linespace: Array<number>;
    dmArray: Array<number>;
}
let data: DataPack = {
    linespace: [],
    dmArray: []
};
const Chart = require('chart.js');
ipcRenderer.send('selectMaterial', 'SiO2');
console.log("Wysłalem dane")
ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
    data = arg;
    console.log(arg);
    var ctx: any = document.getElementById('myChart');
    if (ctx) {
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.linespace,
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
                }
            }
        });
    }
})







//API