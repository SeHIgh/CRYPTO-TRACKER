import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark",
    default: true,
});

export const contentHeightAtom = atom({
    key: "contentHeight",
    default: 500,
});
