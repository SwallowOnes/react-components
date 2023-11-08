import { createContext } from "react";

import { IData } from "../types/interfaces";

const DataContext = createContext<IData | null>(null);

export default DataContext;