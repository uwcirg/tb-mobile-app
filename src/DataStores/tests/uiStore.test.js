
import {UIStore} from "../uiStore";

it("toggles menu", () => {
    const store = new UIStore();
    expect(store.menuOpened).toBe(false);
    store.toggleMenu();
    expect(store.menuOpened).toBe(true);
    store.toggleMenu();
    expect(store.menuOpened).toBe(false);
})

