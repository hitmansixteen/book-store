import { useRouter } from "next/router";
import Link from "next/link";

export default function InfoPage() {
    const r = useRouter();
    const { slug } = r.query;
    const renderContent = () => {
        if (!slug) {
            return <h1>...</h1>;
        }
        if (slug[0] === "faqs") {
            return <h1>Frequently Asked Questions</h1>;
        }

        if (slug[0] === "support") {
            return <h1>Support Section</h1>;
        }

        if (slug.length > 1) {
            return <h1>{slug.join(" / ")}</h1>;
        }

        return <h1>Information Page: {slug.join(" / ")}</h1>;
    };

    return (
        <div>
            {renderContent()}

            <nav>
                <li>
                    <Link href="/info">Info Home</Link>
                </li>
                <li>
                    <Link href="/info/faqs">FAQs</Link>
                </li>
                <li>
                    <Link href="/info/support">Support</Link>
                </li>
                <li>
                    <Link href="/">Home</Link>
                </li>
            </nav>
        </div>
    );
}
