"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function ExportButton() {
  return (
    <Button onClick={() => window.print()}>
      Exportieren <Printer className="ml-2" />
    </Button>
  );
}
