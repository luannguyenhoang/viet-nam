import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "@/app/components/templates/DefautLayout";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

'use client';
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
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
