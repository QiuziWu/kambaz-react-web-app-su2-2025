import Labs from "./Labs/index.tsx";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import Session from "./Kambaz/Account/Session";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Session>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="Kambaz" />} />
              <Route path="/Labs/*" element={<Labs />} />
              <Route path="/Kambaz/*" element={<Kambaz />} />
            </Routes>
          </div>
        </Session>
      </Provider>
    </HashRouter>
  );
}
