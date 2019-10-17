export default class C {
    private static windowWidth: number = 800;
    private static windowHeight: number = 600;

    public static getWindowHeight(): number {
        return this.windowHeight;
    }

    public static getWindowWidth(): number {
        return this.windowWidth;
    }
}