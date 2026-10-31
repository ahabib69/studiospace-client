import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: {
    default: "StudioSpace — Room for your next big idea",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book inspiring photo studios, sound stages, podcast rooms, music suites and creative workshops by the hour.",
};
const themeScript = `(function(){try{var t=localStorage.getItem('studio-theme');if(t!=='studioLight'&&t!=='studioDark')t='studioDark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t==='studioDark'?'dark':'light'}catch(e){}})()`;
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="studioDark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
