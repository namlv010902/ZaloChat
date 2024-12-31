import { atom } from "jotai";

const userAtom = atom(null);

const tokenAtom = atom(null);

const isLoggedInAtom = atom((get) => !!get(tokenAtom));

export { userAtom, tokenAtom, isLoggedInAtom };