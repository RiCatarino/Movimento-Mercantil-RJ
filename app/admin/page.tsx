export default function AdminPage() {
  const user = 'admin';
  if (user === 'admin') {
    return <button>admin</button>;
  } else {
    return <button>not admin</button>;
  }
}
