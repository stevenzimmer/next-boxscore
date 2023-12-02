import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <a className="block fixed left-6 bottom-6 z-50 bg-white rounded-lg px-12 py-3 shadow-lg border-2 border-transparent hover:border-blue-200 hover:bg-blue-50 font-hntMedium" href="https://webzim.dev/">&#8592; &nbsp; Back to Webzim</a>
        </AuthProvider>
    );
}

export default MyApp;
