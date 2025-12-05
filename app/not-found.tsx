import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container mx-auto px-6 py-32 text-center">
            <h1 className="text-4xl font-bold text-slate-900">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-slate-600">The page you are looking for does not exist.</p>
            <Link href="/" className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                Back to Home
            </Link>
        </div>
    );
}
