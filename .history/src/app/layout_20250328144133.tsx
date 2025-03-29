import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "@/app/components/templates/DefautLayout";
import "../styles/globals.css";
import { Metadata } from 'next'

// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

async function getMetadata({}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_RMS_URL}/${slug}`, {
      next: { revalidate: 3600 } // revalidate every hour
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata();
  
  return {
    title: metadata?.title || 'Du Lịch Việt Nam',
    description: metadata?.description || 'Khám phá vẻ đẹp Việt Nam',
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      images: metadata?.og_image?.[0]?.url ? [metadata.og_image[0].url] : [],
    },
    ...(metadata?.canonical && {
      canonical: metadata.canonical
    })
  }
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <DefaultLayout>{children}</DefaultLayout>
    </ChakraProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
