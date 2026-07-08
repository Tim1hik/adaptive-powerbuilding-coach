"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type Values = z.infer<typeof schema>;

export function AuthForm({ mode }: { mode: "signIn" | "signUp" }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  async function submit(values: Values) {
    const client = getSupabaseBrowserClient();
    if (!client) {
      setMessage(t("demoMode"));
      if (mode === "signUp") router.push("/onboarding");
      return;
    }
    const result =
      mode === "signUp"
        ? await client.auth.signUp({ email: values.email, password: values.password })
        : await client.auth.signInWithPassword({ email: values.email, password: values.password });
    if (result.error) {
      setMessage(t("authError"));
      return;
    }
    setMessage(mode === "signUp" ? t("signedUp") : t("signedIn"));
    if (mode === "signUp") router.push("/onboarding");
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="grid gap-3">
      <label className="grid gap-1 text-sm">
        <span className="text-foreground">{t("email")}</span>
        <input className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register("email")} />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-foreground">{t("password")}</span>
        <input type="password" className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register("password")} />
      </label>
      <Button type="submit">{t(mode)}</Button>
      <p className="text-sm text-muted-foreground">{message || t("anyProvider")}</p>
    </form>
  );
}
