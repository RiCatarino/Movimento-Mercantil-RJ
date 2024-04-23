'use client';

export default function AdminPage() {
  const user = 'admin';
  if (user === 'admin') {
    return <></>;
  } else {
    return <button>not admin</button>;
  }
}
