import "./assets/styles/index.css";
import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./errors/ErrorBoundary";
import PrivateRoutes from "./utils/PrivateRoute";

const LazyLogin = React.lazy(() => import("./pages/Login"));
const LazyForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyPeople = React.lazy(() => import("./pages/People"));
const LazyInvoices = React.lazy(() => import("./pages/Invoices"));
const LazyTransactions = React.lazy(() => import("./pages/Transactions"));
const LazyChats = React.lazy(() => import("./pages/Chats"));
const LazySettings = React.lazy(() => import("./pages/Settings"));

function App() {
  const [isRoutesLoaded, setIsRoutesLoaded] = useState(false);

  useEffect(() => {
    setIsRoutesLoaded(true);
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<Spinner />}>
            {isRoutesLoaded && (
              <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LazyLogin />} />
                <Route
                  path="/forgot-password"
                  element={<LazyForgotPassword />}
                />

                <Route element={<PrivateRoutes />}>
                  <Route path="/home" element={<LazyHome />} />
                  <Route path="/people" element={<LazyPeople />} />
                  <Route path="/invoices" element={<LazyInvoices />} />
                  <Route path="/transactions" element={<LazyTransactions />} />
                  <Route path="/chats" element={<LazyChats />} />
                  <Route path="/settings" element={<LazySettings />} />
                </Route>
              </Routes>
            )}
          </Suspense>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
