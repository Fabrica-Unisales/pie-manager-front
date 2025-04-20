import Link from 'next/link';

export default function Menu() {
  return (
    <nav className="menu">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/users">Users</Link>
    </nav>
  );
}