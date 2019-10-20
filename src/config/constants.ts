export default class C {
    private static windowWidth: number = 1200;
    private static windowHeight: number = 800;

    public static getWindowHeight(): number {
        return this.windowHeight;
    }

    public static getWindowWidth(): number {
        return this.windowWidth;
    }
}