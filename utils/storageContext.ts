import { createContext } from "react";
import Storage from "./storage";

export const StorageContext = createContext(new Storage());