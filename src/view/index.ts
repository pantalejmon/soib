const { ipcRenderer } = require('electron');
const Chart = require('chart.js');
require('chartjs-plugin-zoom');
// const TabGroup = require("electron-tabs");

interface DataPack {
    linespace: Array<number>;
    dmArray: Array<number>;
}
interface Point {
    x: number;
    y: number;
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

function getData(material: string) {
    let buttons: any = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons.className = buttons[i].classList.remove("active");
        // console.log("Usuwam zaznaczenie z przycisku: ")
        // console.log(buttons[i])
    }
    document.getElementById(material)!.classList.add("active");

    switch (material) {
        case "SiO2":
            document.getElementById("material")!.innerHTML = "[0.696749, 0.408218, 0.890815, 0.069066, 0.115662, 9.900559]";
            ipcRenderer.send('selectMaterial', 'SiO2');
            break;
        case "SiO2GiO2":
            document.getElementById("material")!.innerHTML = "[0.71104, 0.451885, 0.704048, 0.06427, 0.129408, 9.425478]";
            ipcRenderer.send('selectMaterial', 'SiO2GiO2');
            break;
        case "GeO2":
            document.getElementById("material")!.innerHTML = "[0.80686642, 0.71815848, 0.85416831, 0.068972606, 0.15396605, 11.841931]";
            ipcRenderer.send('selectMaterial', 'GeO2');
            break;
        case "Al2O3":
            document.getElementById("material")!.innerHTML = "[1.023798, 1.058264, 5.280792, 0.06144821, 0.1106997, 17.92656]";
            ipcRenderer.send('selectMaterial', 'Al2O3');
            break;
        case "ZrO2":
            document.getElementById("material")!.innerHTML = "[1.347091, 2.117788, 9.452943, 0.062543, 0.166739, 24.320570]";
            ipcRenderer.send('selectMaterial', 'ZrO2');
            break;
        default:
            ipcRenderer.send('selectMaterial', 'SiO2'); break;
    }
    console.log("kliknąłeś material: " + material)
}





// ipcRenderer.send('selectMaterial', 'SiO2');
ipcRenderer.on('sendData', (event: any, arg: DataPack) => {
    data = arg;
    // console.log(arg);
    // console.log(data.linespace);
    // console.log(data.dmArray);
    let pointArray: Array<Point> = dataToPoints(data);
    var ctx: any = document.getElementById('myChart');
    if (ctx) {
        var myLineChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: pointArray,
                    label: "Dyspersja",
                    borderColor: "#3e95cd",
                    fill: false
                }]
            }, options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                },
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




function dataToPoints(data: DataPack): Array<Point> {
    let points: Array<Point> = new Array<Point>();
    for (let i = 0; i < data.linespace.length; i++) {
        points.push({ x: data.linespace[i], y: data.dmArray[i] })
    }
    return points;
}