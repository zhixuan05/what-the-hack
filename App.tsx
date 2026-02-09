import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { LoginScreen } from "./components/LoginScreen";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { InventoryList } from "./components/InventoryList";
import { ItemDetail } from "./components/ItemDetail";
import { CycleCount } from "./components/CycleCount";
import { PurchaseOrders } from "./components/PurchaseOrders";
import { PurchaseOrderDetails } from "./components/PurchaseOrderDetails";
import { CreatePO } from "./components/CreatePO";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { ReorderRecommendations } from "./components/ReorderRecommendations";
import { Toaster } from "./components/ui/sonner";
import { KeyboardShortcutsProvider } from "./components/KeyboardShortcuts";
import { AIAssistant } from "./components/AIAssistant";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: "OWNER" | "STAFF";
  } | null>(null);

  const handleLogin = (userData: {
    name: string;
    email: string;
    role: "OWNER" | "STAFF";
  }) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Router>
      <KeyboardShortcutsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                onLogout={handleLogout}
                currentUser={currentUser}
              />
            }
          >
            <Route
              index
              element={<Dashboard currentUser={currentUser} />}
            />
            <Route
              path="inventory"
              element={<InventoryList />}
            />
            <Route
              path="inventory/:id"
              element={<ItemDetail />}
            />
            <Route
              path="purchase-orders"
              element={
                <PurchaseOrders currentUser={currentUser} />
              }
            />
            <Route
              path="purchase-orders/create"
              element={<CreatePO />}
            />
            <Route
              path="purchase-orders/:poNumber"
              element={<PurchaseOrderDetails />}
            />
            <Route
              path="cycle-count"
              element={<CycleCount />}
            />
            <Route path="reports" element={<Reports />} />
            <Route
              path="settings"
              element={<Settings currentUser={currentUser} />}
            />
            <Route
              path="reorder-recommendations"
              element={<ReorderRecommendations />}
            />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Route>
        </Routes>
        <AIAssistant />
        <Toaster />
      </KeyboardShortcutsProvider>
    </Router>
  );
}