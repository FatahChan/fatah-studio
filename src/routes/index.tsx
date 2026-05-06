import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
});

function Home() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoMessage, setTodoMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodoMessage("");

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: todoTitle }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setTodoMessage(body.error ?? "Failed to create todo");
      return;
    }

    setTodoTitle("");
    setTodoMessage("Todo created");
  };

  const runAuth = async (
    endpoint: "/api/auth/sign-up/email" | "/api/auth/sign-in/email",
  ) => {
    setAuthMessage("");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, name: "Test User" }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      setAuthMessage(body.message ?? "Auth request failed");
      return;
    }

    setAuthMessage(
      endpoint.includes("sign-up") ? "Sign up success" : "Sign in success",
    );
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runAuth("/api/auth/sign-up/email");
  };

  const handleSignIn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await runAuth("/api/auth/sign-in/email");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10 p-8">
      <h1 className="text-3xl font-bold">
        D1 + Drizzle + Better Auth Playground
      </h1>

      <section className="space-y-3 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Create Todo (Drizzle)</h2>
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Todo title"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
          <button
            className="rounded bg-black px-4 py-2 text-white"
            type="submit"
          >
            Add
          </button>
        </form>
        {todoMessage ? <p className="text-sm">{todoMessage}</p> : null}
      </section>

      <section className="space-y-3 rounded-lg border p-4">
        <h2 className="text-xl font-semibold">Test Better Auth</h2>
        <form className="space-y-3" onSubmit={handleSignUp}>
          <input
            className="w-full rounded border px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full rounded border px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="rounded bg-black px-4 py-2 text-white"
              type="submit"
            >
              Sign Up
            </button>
            <button
              className="rounded border px-4 py-2"
              type="button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </form>
        {authMessage ? <p className="text-sm">{authMessage}</p> : null}
      </section>
    </div>
  );
}
