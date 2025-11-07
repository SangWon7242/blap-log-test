"use client";

import Link from "next/link";
import { MENU_LIST } from "./Header.constants";
import { useState } from "react";

export default function Header() {
  return (
    <header className="top-bar shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
      <div className="con h-[80px] flex justify-between">
        <div className="logo-box">
          <Link href="/" className="flex h-full items-center text-xl font-bold">
            blap-log
          </Link>
        </div>
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
