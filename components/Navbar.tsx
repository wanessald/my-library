"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function NavbarClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  // Evita hidratação até o componente montar no client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostra uma navbar neutra durante o SSR e hidratação
  if (!mounted) {
    return (
      <nav className="w-full flex justify-end items-center gap-6 px-8 py-4 text-sm font-bold">
        <div className="flex gap-6">
          <div className="w-16 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="w-9 h-9 bg-muted rounded animate-pulse"></div>
      </nav>
    );
  }

  // Usuário logado
  if (isLoaded && isSignedIn) {
    return (
      <nav className="w-full flex flex-col sm:flex-row sm:justify-center items-center px-4 sm:px-8 py-4 sm:pt-8 text-base sm:text-lg font-medium bg-background z-50 relative">
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-center gap-2 sm:gap-6">
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-foreground my-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>

          <div className="flex sm:hidden items-center px-2">
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
              Olá, {user?.firstName || "leitor"} 👋
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </div>

          {/* Links desktop */}
          <div className="hidden sm:flex gap-2 sm:gap-6">
            <Link
              href="/"
              className="px-4 py-2 hover:underline transition whitespace-nowrap flex items-center justify-center"
            >
              Inicio
            </Link>
            <Link
              href="/estante"
              className="px-4 py-2 hover:underline transition whitespace-nowrap flex items-center justify-center"
            >
              Biblioteca
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 hover:underline transition whitespace-nowrap flex items-center justify-center"
            >
              Painel
            </Link>
          </div>
        </div>

        {/* Modo e usuário */}
        <div className="hidden sm:flex items-center gap-4 ml-6">
          <ModeToggle />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Olá, {user?.firstName || "leitor"} 👋
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-background shadow-md border-b z-40 animate-fade-in">
            <div className="flex flex-col gap-2 py-2 px-4">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/estante"
                className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition"
                onClick={() => setMenuOpen(false)}
              >
                My Library
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 hover:underline hover:bg-muted transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <div className="border-t border-muted my-2" />

              <div className="flex justify-center py-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Usuário não logado ou ainda carregando
  return (
    <nav className="w-full flex justify-end items-center gap-6 px-8 py-4 text-sm font-bold">
      <Link href="/login" className="hover:underline">
        ENTRAR
      </Link>
      <Link href="/create-account" className="hover:underline">
        CRIAR CONTA
      </Link>
      <ModeToggle />
    </nav>
  );
}
