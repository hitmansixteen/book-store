import Link from "next/link";
export default function InfoPage() {
    return (
        <div>
            <h1>Welcome to the Info Section</h1>
            <nav>
                <li>
                    <Link href="/info/faqs">FAQs</Link>
                </li>
                <li>
                    <Link href="/info/support">Support</Link>
                </li>
                <Link href={`/`}>
                    <button className="blueButton">Home Page</button>
                </Link>
            </nav>
        </div>
    );
}
