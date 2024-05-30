import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";

const LazyChatsPage = React.lazy(() => import("./pages/Chats"));
const LazyExpensesPage = React.lazy(() => import("./pages/Expenses"));
const LazyHomePage = React.lazy(() => import("./pages/Home"));
const LazyPaymentsPage = React.lazy(() => import("./pages/Payments"));
const LazyPeoplePage = React.lazy(() => import("./pages/People"));
const LazyRecordsPage = React.lazy(() => import("./pages/Records"));
const LazySettingsPage = React.lazy(() => import("./pages/Settings"));

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
            <Route path="/expenses" element={<LazyExpensesPage />} />
            <Route path="/payments" element={<LazyPaymentsPage />} />
            <Route path="/people" element={<LazyPeoplePage />} />
            <Route path="/records" element={<LazyRecordsPage />} />
            <Route path="/settings" element={<LazySettingsPage />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
