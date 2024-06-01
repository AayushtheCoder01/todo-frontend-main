import { atom, atomFamily, selector } from "recoil";

export const loginAtom = atom({
    key: "LoginAtom",
    default: false,
})

export const userDataAtom = atom({
    key: "userDataAtom",
    default: null
})
