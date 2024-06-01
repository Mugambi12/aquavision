import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import "./assets/styles/index.css";

const LazyChatsPage = React.lazy(() => import("./pages/Chats"));
const LazyHomePage = React.lazy(() => import("./pages/Home"));
const LazyPeoplePage = React.lazy(() => import("./pages/People"));
const LazyRecordsPage = React.lazy(() => import("./pages/Records"));
const LazySettingsPage = React.lazy(() => import("./pages/Settings"));
const LazyTransactionsPage = React.lazy(() => import("./pages/Transactions"));

function App() {
  const [isRoutesLoaded, setIsRoutesLoaded] = useState(false);

  useEffect(() => {
    setIsRoutesLoaded(true);
  }, []);

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        {isRoutesLoaded && (
          <Routes>
            <Route path="/home" element={<LazyHomePage />} />
            <Route path="/chats" element={<LazyChatsPage />} />
            <Route path="/people" element={<LazyPeoplePage />} />
            <Route path="/records" element={<LazyRecordsPage />} />
            <Route path="/settings" element={<LazySettingsPage />} />
            <Route path="/transactions" element={<LazyTransactionsPage />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
