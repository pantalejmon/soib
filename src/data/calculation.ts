import MaterialRatio from "./materialRatio";
import DataPack from "./dataPack";

export default class Calculation {

    //Źródło: https://refractiveindex.info/
    private SiO2: MaterialRatio = new MaterialRatio("SiO2", 0.696749, 0.408218, 0.890815, 0.069066, 0.115662, 9.900559);
    private SiO2GiO2: MaterialRatio = new MaterialRatio("SiO2GiO2", 0.71104, 0.451885, 0.704048, 0.06427, 0.129408, 9.425478);
    private GeO2: MaterialRatio = new MaterialRatio("GeO2", 0.80686642, 0.71815848, 0.85416831, 0.068972606, 0.15396605, 11.841931);
    private Al2O3: MaterialRatio = new MaterialRatio("Al2O3", 1.023798, 1.058264, 5.280792, 0.06144821, 0.1106997, 17.92656);
    private ZrO2: MaterialRatio = new MaterialRatio("Zr02", 1.347091, 2.117788, 9.452943, 0.062543, 0.166739, 24.320570);

    private pointer: MaterialRatio = this.SiO2;

    compute(material: string, min: number, max: number, step: number): DataPack {
        this.recognizeMaterial(material);
        if (!max) max = 4;
        if (!min) min = 0.5;
        if (!step) step = 0.01
        let wavelengths: Array<number> = this.linespace(min, step, max);
        //console.log(min, step, max);
        //console.log(wavelengths);
        console.log("[CALCULATIONS] Licze dla materiału: " + this.pointer.getname());
        let DmArray: Array<number> = new Array<number>();
        for (let wl of wavelengths) DmArray.push(this.pointer.calculateD(wl));

        return {
            linespace: wavelengths,
            dmArray: DmArray
        }
    }

    recognizeMaterial(material: string) {
        switch (material) {
            case "SiO2":
                this.pointer = this.SiO2;
                break;
            case "SiO2GiO2":
                this.pointer = this.SiO2GiO2;
                break;
            case "GeO2":
                this.pointer = this.GeO2;
                break;
            case "Al2O3":
                this.pointer = this.Al2O3;
                break;
            case "ZrO2":
                this.pointer = this.ZrO2;
                break;
            default:
                this.pointer = this.SiO2;
                break;
        }
    }

    linespace(start: number, step: number, stop: number): Array<number> {
        let ls: Array<number> = new Array<number>();
        let cardinality: number = (stop - start) / (step);
        for (var i = 0; i < cardinality; i++) {
            ls.push(start + (step * i));
        }
        return ls;
    }
}


