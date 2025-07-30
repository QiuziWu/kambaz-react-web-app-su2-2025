import { Route, Routes, Navigate } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import TOC from "./TOC";
import store from "./store";
import { Provider } from "react-redux";


export default function Labs() {
    return (
        <Provider store={store}>
            <div className="p-3">
                <h2>Welcome to Web Dev</h2>
                <h4>Qiuzi Wu</h4>
                <p>Welcome to the Labs section!</p>
                <TOC />
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1" />} />
                    <Route path="Lab1" element={<Lab1 />} />
                    <Route path="Lab2/*" element={<Lab2 />} />
                    <Route path="Lab3/*" element={<Lab3 />} />
                    <Route path="Lab4/*" element={<Lab4 />} />
                </Routes>
            </div>
        </Provider>
    );
}
