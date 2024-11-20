import { Routes, Route } from "react-router-dom";
import AllListsView from "../components/list/AllListsView";
import ListView from "../components/list/ListView";
import ProtectedRoute from "../components/helper/ProtectedRoute";

import styles from "../components/list/AllListsView.module.css";

const List = () => {
  return (
    <section className={styles["list-container"]}>
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<AllListsView />} />
          <Route path="/:id" element={<ListView />} />
        </Routes>
      </ProtectedRoute>
    </section>
  );
};

export default List;
