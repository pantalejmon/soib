export default class MaterialRatio {
    private name: string;
    private G1: number;
    private G2: number;
    private G3: number;
    private L1: number;
    private L2: number;
    private L3: number;

    constructor($name: string, $G1: number, $G2: number, $G3: number, $L1: number, $L2: number, $L3: number) {
        this.name = $name;
        this.G1 = $G1;
        this.G2 = $G2;
        this.G3 = $G3;
        this.L1 = $L1;
        this.L2 = $L2;
        this.L3 = $L3;
    }

    public calculateD(wavelength: number): number {
        let n: number = Math.sqrt(1 + ((this.G1 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L1 ** 2))) + ((this.G2 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L2 ** 2))) + ((this.G3 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L3 ** 2))))

        // dyspersja widmowa Dw = dn/dl
        let Aw: number = (2 * this.G1 * wavelength) / ((wavelength ** 2) - (this.L1 ** 2));
        let Bw: number = (2 * this.G1 * (wavelength ** 3)) / (((wavelength ** 2) - (this.L1 ** 2)) ** 2);
        let Cw: number = (2 * this.G2 * wavelength) / ((wavelength ** 2) - (this.L2 ** 2));
        let Dw: number = (2 * this.G2 * (wavelength ** 3)) / (((wavelength ** 2) - (this.L2 ** 2)) ** 2);
        let Ew: number = (2 * this.G3 * wavelength) / ((wavelength ** 2) - (this.L3 ** 2));
        let Fw: number = (2 * this.G3 * (wavelength ** 3)) / (((wavelength ** 2) - (this.L3 ** 2)) ** 2);
        let Gw: number = (Aw - Bw + Cw - Dw + Ew - Fw)
        Dw = (Gw) / (2 * n)

        //dyspersja materialowa Dm = (-l/c)*(d^2)n/d(l^2)
        let Am: number = (2 * this.G1) / ((wavelength ** 2) - (this.L1 ** 2))
        let Bm: number = (10 * this.G1 * (wavelength ** 2)) / (((wavelength ** 2) - (this.L1 ** 2)) ** 2);
        let Cm: number = (8 * this.G1 * (wavelength ** 4)) / (((wavelength ** 2) - (this.L1 ** 2)) ** 3);
        let Dm: number = (2 * this.G2) / ((wavelength ** 2) - (this.L2 ** 2));
        let Em: number = (10 * this.G2 * (wavelength ** 2)) / (((wavelength ** 2) - (this.L2 ** 2)) ** 2);
        let Fm: number = (8 * this.G2 * (wavelength ** 4)) / (((wavelength ** 2) - (this.L2 ** 2)) ** 3);
        let Gm: number = (2 * this.G3) / ((wavelength ** 2) - (this.L3 ** 2));
        let Hm: number = (10 * this.G3 * (wavelength ** 2)) / (((wavelength ** 2) - (this.L3 ** 2)) ** 2);
        let Im: number = (8 * this.G3 * (wavelength ** 4)) / (((wavelength ** 2) - (this.L3 ** 2)) ** 3);

        let Ym = (Am - Bm + Cm + Dm - Em + Fm + Gm - Hm + Im) / (2 * n)
        let Zm = ((Gw) ** 2) / (4 * (n ** (3 / 2)))
        Dm = (-wavelength / (3 * 10 ** 8)) * (Ym - Zm) * (10 ** 12) //ps / nm km
        return Dm;
    }

    public calculateN(wavelength: number): number {
        let n: number;
        n = Math.sqrt(1 + ((this.G1 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L1 ** 2))) + ((this.G2 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L2 ** 2))) + ((this.G3 * (wavelength ** 2)) / ((wavelength ** 2) - (this.L3 ** 2))))
        return n;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public getname(): string {
        return this.name;
    }

    /**
     * Getter $G1
     * @return {number}
     */
    public getG1(): number {
        return this.G1;
    }

    /**
     * Getter $G2
     * @return {number}
     */
    public getG2(): number {
        return this.G2;
    }

    /**
     * Getter $G3
     * @return {number}
     */
    public getG3(): number {
        return this.G3;
    }

    /**
     * Getter $L1
     * @return {number}
     */
    public getL1(): number {
        return this.L1;
    }

    /**
     * Getter $L2
     * @return {number}
     */
    public getL2(): number {
        return this.L2;
    }

    /**
     * Getter $L3
     * @return {number}
     */
    public getL3(): number {
        return this.L3;
    }
}