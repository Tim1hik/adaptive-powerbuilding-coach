"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function shortenAddress(address: string) {
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}

export function CryptoWalletCard({ network, address }: { network: string; address?: string }) {
  const t = useTranslations("support");
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Card className="rounded-lg border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base">{network}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="font-mono text-sm text-card-foreground">{address ? shortenAddress(address) : t("comingSoon")}</p>
        <Button type="button" variant="outline" onClick={copyAddress} disabled={!address} className="w-fit">
          <Copy className="mr-2 h-4 w-4" />
          {copied ? t("copied") : t("copy")}
        </Button>
      </CardContent>
    </Card>
  );
}
