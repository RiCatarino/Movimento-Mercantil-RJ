export default function AdminPage() {

  const user = 'admin';
  if (user === 'admin') {
    return <button>admin test</button>;
  } else {
    return <button>not admin</button>;
  }
}
