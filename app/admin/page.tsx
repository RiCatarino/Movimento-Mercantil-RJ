'use client';
import { Button } from "@/components/ui/button";

export default function AdminPage() {

  const user = 'admin';
  if (user === 'admin') {
    return <Button> CLick me</Button>;
  } else {

    return <button>not admin</button>;

  }
}
