import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./assets/styles/index.css";
import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./errors/ErrorBoundary";

const LazyChatsPage = React.lazy(() => import("./pages/ChatsPage"));
const LazyHomePage = React.lazy(() => import("./pages/HomePage"));
const LazyPeoplePage = React.lazy(() => import("./pages/PeoplePage"));
const LazyInvoicesPage = React.lazy(() => import("./pages/InvoicesPage"));
const LazySettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const LazyTransactionsPage = React.lazy(() =>
  import("./pages/TransactionsPage")
);

const LazyLoginPage = React.lazy(() => import("./pages/LoginPage"));
const LazyForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);

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
                <Route path="/home" element={<LazyHomePage />} />
                <Route path="/chats" element={<LazyChatsPage />} />
                <Route path="/people" element={<LazyPeoplePage />} />
                <Route path="/invoices" element={<LazyInvoicesPage />} />
                <Route path="/settings" element={<LazySettingsPage />} />
                <Route
                  path="/transactions"
                  element={<LazyTransactionsPage />}
                />
                <Route path="*" element={<Navigate to="/login" />} />

                <Route path="/login" element={<LazyLoginPage />} />
                <Route
                  path="/forgot-password"
                  element={<LazyForgotPasswordPage />}
                />
              </Routes>
            )}
          </Suspense>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
