"use client";

import Link from "next/link";
import { MENU_LIST } from "./constants";

export default function Header() {
  return (
    <header className="top-bar">
      <div className="con h-[80px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex">
        <div className="auth-menu">
          <ul className="flex h-full">
            {MENU_LIST.map((menu) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className="flex h-full items-center px-3"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
