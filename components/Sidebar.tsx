// components/Sidebar.js
import React from "react";
import Link from "next/link";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
