"use client"; // Ensure this runs only on the client

import { Provider } from "react-redux";
import { store } from "./store/store";


export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
